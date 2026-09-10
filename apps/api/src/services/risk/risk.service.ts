import { prisma } from '../../config/database';
import { AppError } from '../../middleware/error.middleware';
import { logger } from '@signalforge/logger';
import { RiskDecision, RiskCheck, RiskProfileData } from '../../types/risk.types';
import { startOfDay, endOfDay } from '../../utils/date';

export class RiskService {
  async getRiskProfile(userId: string) {
    let profile = await prisma.riskProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      // Create default risk profile
      profile = await prisma.riskProfile.create({
        data: {
          userId,
          riskPercent: 1,
          maxDailyLoss: 3,
          maxDrawdown: 10,
          maxOpenTrades: 5,
        },
      });
    }

    return profile;
  }

  async updateRiskProfile(userId: string, data: Partial<RiskProfileData>) {
    await this.getRiskProfile(userId);

    return prisma.riskProfile.update({
      where: { userId },
      data: {
        riskPercent: data.riskPercent,
        maxDailyLoss: data.maxDailyLoss,
        maxDrawdown: data.maxDrawdown,
        maxOpenTrades: data.maxOpenTrades,
        tradingSessions: data.tradingSessions as any,
        trailingStop: data.trailingStop,
        breakEven: data.breakEven,
        profitLock: data.profitLock,
        partialClose: data.partialClose,
        correlationProtection: data.correlationProtection,
        newsFilter: data.newsFilter,
        emergencyStop: data.emergencyStop,
      },
    });
  }

  async evaluateSignal(
    userId: string,
    signal: {
      id: string;
      symbol: string | null;
      direction: string | null;
      confidence: number | null;
      stopLoss: number | null;
      entryPrice: number | null;
    },
    accountId: string
  ): Promise<RiskDecision> {
    const profile = await this.getRiskProfile(userId);
    const account = await prisma.brokerAccount.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new AppError('Broker account not found', 404);
    }

    const checks: RiskCheck[] = [];

    // 1. Signal validity check
    checks.push(this.checkSignalValidity(signal));

    // 2. Emergency stop check
    if (profile.emergencyStop) {
      checks.push(await this.checkEmergencyStop(userId));
    }

    // 3. Daily loss check
    checks.push(await this.checkDailyLoss(userId, account.id, profile.maxDailyLoss));

    // 4. Max open trades check
    checks.push(await this.checkMaxOpenTrades(userId, profile.maxOpenTrades));

    // 5. Trading session check
    checks.push(this.checkTradingSession(profile.tradingSessions as any));

    // 6. Duplicate trade check
    checks.push(await this.checkDuplicateTrade(userId, signal.symbol, signal.direction));

    // 7. Margin check
    checks.push(this.checkMargin(account.equity, account.margin, profile.riskPercent));

    // 8. Stop loss requirement
    checks.push(this.checkStopLoss(signal.stopLoss));

    // Determine overall decision
    const criticalFailures = checks.filter(
      c => !c.passed && (c.severity === 'CRITICAL' || c.severity === 'HIGH')
    );

    const approved = criticalFailures.length === 0;
    const reasons = checks.filter(c => !c.passed).map(c => c.message);
    const overallScore = checks.filter(c => c.passed).length / checks.length;

    logger.debug(`Risk evaluation for user ${userId}: ${approved ? 'APPROVED' : 'REJECTED'}`);

    return {
      approved,
      checks,
      overallScore,
      reasons,
    };
  }

  private checkSignalValidity(signal: any): RiskCheck {
    if (!signal.symbol || !signal.direction) {
      return {
        name: 'Signal Validity',
        passed: false,
        severity: 'CRITICAL',
        message: 'Signal missing symbol or direction',
      };
    }

    return {
      name: 'Signal Validity',
      passed: true,
      severity: 'LOW',
      message: 'Signal is valid',
    };
  }

  private async checkEmergencyStop(userId: string): Promise<RiskCheck> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { status: true },
    });

    if (user?.status !== 'ACTIVE') {
      return {
        name: 'Account Status',
        passed: false,
        severity: 'CRITICAL',
        message: 'Account is not active',
      };
    }

    return {
      name: 'Emergency Stop',
      passed: true,
      severity: 'LOW',
      message: 'No emergency stop active',
    };
  }

  private async checkDailyLoss(userId: string, accountId: string, maxDailyLossPercent: number): Promise<RiskCheck> {
    const today = new Date();
    const start = startOfDay(today);
    const end = endOfDay(today);

    const account = await prisma.brokerAccount.findUnique({
      where: { id: accountId },
      select: { balance: true },
    });

    if (!account) {
      return {
        name: 'Daily Loss',
        passed: false,
        severity: 'HIGH',
        message: 'Account not found',
      };
    }

    const closedTrades = await prisma.trade.findMany({
      where: {
        userId,
        brokerAccountId: accountId,
        status: 'CLOSED',
        closedAt: { gte: start, lte: end },
      },
      select: { realizedProfit: true },
    });

    const dailyPnL = closedTrades.reduce((sum, t) => sum + (t.realizedProfit || 0), 0);
    const dailyLoss = dailyPnL < 0 ? Math.abs(dailyPnL) : 0;
    const maxLoss = (account.balance * maxDailyLossPercent) / 100;

    const passed = dailyLoss < maxLoss;

    return {
      name: 'Daily Loss Limit',
      passed,
      severity: 'HIGH',
      message: passed
        ? `Daily loss $${dailyLoss.toFixed(2)} within limit $${maxLoss.toFixed(2)}`
        : `Daily loss $${dailyLoss.toFixed(2)} exceeds limit $${maxLoss.toFixed(2)}`,
      value: dailyLoss,
      limit: maxLoss,
    };
  }

  private async checkMaxOpenTrades(userId: string, maxOpenTrades: number): Promise<RiskCheck> {
    const openTradesCount = await prisma.trade.count({
      where: {
        userId,
        status: 'OPEN',
      },
    });

    const passed = openTradesCount < maxOpenTrades;

    return {
      name: 'Max Open Trades',
      passed,
      severity: 'MEDIUM',
      message: passed
        ? `Open trades: ${openTradesCount}/${maxOpenTrades}`
        : `Maximum open trades reached: ${openTradesCount}/${maxOpenTrades}`,
      value: openTradesCount,
      limit: maxOpenTrades,
    };
  }

  private checkTradingSession(sessions: any[] | null): RiskCheck {
    if (!sessions || sessions.length === 0) {
      return {
        name: 'Trading Session',
        passed: true,
        severity: 'LOW',
        message: 'No session restrictions',
      };
    }

    const now = new Date();
    const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const currentDay = dayNames[now.getDay()];
    const currentTime = `${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}`;

    const todaySession = sessions.find((s: any) => s.day === currentDay);

    if (!todaySession || !todaySession.enabled) {
      return {
        name: 'Trading Session',
        passed: false,
        severity: 'HIGH',
        message: `Trading is not allowed on ${currentDay}`,
      };
    }

    const inSession = currentTime >= todaySession.startTime && currentTime <= todaySession.endTime;

    return {
      name: 'Trading Session',
      passed: inSession,
      severity: 'HIGH',
      message: inSession
        ? `Within trading session (${todaySession.startTime}-${todaySession.endTime})`
        : `Outside trading session (${todaySession.startTime}-${todaySession.endTime})`,
    };
  }

  private async checkDuplicateTrade(userId: string, symbol: string | null, direction: string | null): Promise<RiskCheck> {
    if (!symbol) {
      return {
        name: 'Duplicate Trade',
        passed: true,
        severity: 'LOW',
        message: 'Symbol not specified',
      };
    }

    const existing = await prisma.trade.findFirst({
      where: {
        userId,
        symbol,
        direction,
        status: 'OPEN',
      },
    });

    return {
      name: 'Duplicate Trade',
      passed: !existing,
      severity: 'MEDIUM',
      message: existing
        ? `Duplicate: ${symbol} ${direction} already open`
        : `No duplicate found for ${symbol} ${direction}`,
    };
  }

  private checkMargin(equity: number, margin: number, riskPercent: number): RiskCheck {
    const marginLevel = margin > 0 ? (equity / margin) * 100 : 1000;
    const passed = marginLevel > 200;

    return {
      name: 'Margin Level',
      passed,
      severity: 'HIGH',
      message: passed
        ? `Margin level ${marginLevel.toFixed(0)}% is safe`
        : `Low margin level: ${marginLevel.toFixed(0)}%`,
      value: marginLevel,
      limit: 200,
    };
  }

  private checkStopLoss(stopLoss: number | null): RiskCheck {
    return {
      name: 'Stop Loss',
      passed: true,
      severity: 'MEDIUM',
      message: stopLoss ? 'Stop loss provided' : 'No stop loss (will use risk-based stop)',
    };
  }

  // ============ AUTOMATION RULES ============

  async getAutomationRules(userId: string) {
    return prisma.automationRule.findMany({
      where: { userId },
      orderBy: { priority: 'asc' },
    });
  }

  async createAutomationRule(userId: string, data: any) {
    return prisma.automationRule.create({
      data: {
        userId,
        name: data.name,
        condition: data.condition,
        action: data.action,
        priority: data.priority || 0,
        enabled: data.enabled !== false,
      },
    });
  }

  async updateAutomationRule(userId: string, ruleId: string, data: any) {
    const rule = await prisma.automationRule.findFirst({
      where: { id: ruleId, userId },
    });

    if (!rule) {
      throw new AppError('Automation rule not found', 404);
    }

    return prisma.automationRule.update({
      where: { id: ruleId },
      data: {
        name: data.name,
        condition: data.condition,
        action: data.action,
        priority: data.priority,
        enabled: data.enabled,
      },
    });
  }

  async deleteAutomationRule(userId: string, ruleId: string) {
    const rule = await prisma.automationRule.findFirst({
      where: { id: ruleId, userId },
    });

    if (!rule) {
      throw new AppError('Automation rule not found', 404);
    }

    await prisma.automationRule.delete({ where: { id: ruleId } });
  }

  async evaluateAutomationRules(
    userId: string,
    trade: any,
    context: { currentPrice?: number; signalConfidence?: number; providerId?: string }
  ): Promise<Array<{ ruleId: string; action: string; value?: number }>> {
    const rules = await this.getAutomationRules(userId);
    const triggered: Array<{ ruleId: string; action: string; value?: number }> = [];

    for (const rule of rules) {
      if (!rule.enabled) continue;

      const condition = rule.condition as any;
      const action = rule.action as any;

      if (this.evaluateCondition(condition, trade, context)) {
        triggered.push({
          ruleId: rule.id,
          action: action.type,
          value: action.value,
        });
      }
    }

    return triggered;
  }

  private evaluateCondition(condition: any, trade: any, context: any): boolean {
    let actualValue: any;

    switch (condition.type) {
      case 'PROFIT':
        actualValue = trade.realizedProfit || 0;
        break;
      case 'LOSS':
        actualValue = trade.realizedProfit < 0 ? Math.abs(trade.realizedProfit) : 0;
        break;
      case 'CONFIDENCE':
        actualValue = context.signalConfidence || 0;
        break;
      case 'PROVIDER':
        actualValue = trade.providerId;
        break;
      case 'SYMBOL':
        actualValue = trade.symbol;
        break;
      case 'PRICE':
        actualValue = context.currentPrice || trade.entryPrice;
        break;
      case 'TIME':
        actualValue = new Date().getHours();
        break;
      default:
        return false;
    }

    switch (condition.operator) {
      case 'GT': return actualValue > condition.value;
      case 'LT': return actualValue < condition.value;
      case 'GTE': return actualValue >= condition.value;
      case 'LTE': return actualValue <= condition.value;
      case 'EQ': return actualValue === condition.value;
      case 'IN': return Array.isArray(condition.value) && condition.value.includes(actualValue);
      case 'NOT_IN': return Array.isArray(condition.value) && !condition.value.includes(actualValue);
      default: return false;
    }
  }

  // ============ POSITION SIZING ============

  calculatePositionSize(
    accountBalance: number,
    riskPercent: number,
    stopLossPips: number,
    pipValue: number = 10
  ): number {
    const riskAmount = (accountBalance * riskPercent) / 100;
    const lotSize = riskAmount / (stopLossPips * pipValue);
    return Math.max(0.01, Math.round(lotSize * 100) / 100);
  }
}

export const riskService = new RiskService();