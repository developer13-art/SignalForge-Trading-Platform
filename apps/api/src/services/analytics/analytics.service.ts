import { prisma } from '../../config/database';
import { startOfDay, endOfDay, addDays } from '../../utils/date';
import { PerformanceMetrics, EquityCurvePoint, SymbolPerformance } from '../../types/analytics.types';

export class AnalyticsService {
  async getPerformanceMetrics(
    userId: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<PerformanceMetrics> {
    const where: any = {
      userId,
      status: 'CLOSED',
    };

    if (startDate || endDate) {
      where.closedAt = {};
      if (startDate) where.closedAt.gte = startDate;
      if (endDate) where.closedAt.lte = endDate;
    }

    const trades = await prisma.trade.findMany({
      where,
      select: {
        realizedProfit: true,
        closedAt: true,
      },
    });

    const winningTrades = trades.filter(t => (t.realizedProfit || 0) > 0);
    const losingTrades = trades.filter(t => (t.realizedProfit || 0) < 0);

    const totalProfit = winningTrades.reduce((sum, t) => sum + (t.realizedProfit || 0), 0);
    const totalLoss = Math.abs(losingTrades.reduce((sum, t) => sum + (t.realizedProfit || 0), 0));

    const netPnL = totalProfit - totalLoss;
    const winRate = trades.length > 0 ? (winningTrades.length / trades.length) * 100 : 0;

    const averageWin = winningTrades.length > 0 ? totalProfit / winningTrades.length : 0;
    const averageLoss = losingTrades.length > 0 ? totalLoss / losingTrades.length : 0;

    const profitFactor = totalLoss > 0 ? totalProfit / totalLoss : totalProfit > 0 ? 999 : 0;
    const averageRR = averageLoss > 0 ? averageWin / averageLoss : 0;

    // Calculate drawdown
    const maxDrawdown = this.calculateMaxDrawdown(trades);

    // Calculate Sharpe and Sortino ratios
    const returns = trades.map(t => t.realizedProfit || 0);
    const sharpeRatio = this.calculateSharpeRatio(returns);
    const sortinoRatio = this.calculateSortinoRatio(returns);

    return {
      totalTrades: trades.length,
      winningTrades: winningTrades.length,
      losingTrades: losingTrades.length,
      winRate,
      totalProfit,
      totalLoss,
      netPnL,
      averageWin,
      averageLoss,
      profitFactor,
      maxDrawdown: maxDrawdown.amount,
      maxDrawdownPercent: maxDrawdown.percent,
      sharpeRatio,
      sortinoRatio,
      averageRR,
    };
  }

  private calculateMaxDrawdown(trades: any[]): { amount: number; percent: number } {
    let peak = 0;
    let maxDD = 0;
    let running = 0;

    for (const trade of trades.sort((a, b) => 
      new Date(a.closedAt).getTime() - new Date(b.closedAt).getTime()
    )) {
      running += trade.realizedProfit || 0;
      if (running > peak) peak = running;
      const dd = peak - running;
      if (dd > maxDD) maxDD = dd;
    }

    const percent = peak > 0 ? (maxDD / peak) * 100 : 0;
    return { amount: maxDD, percent };
  }

  private calculateSharpeRatio(returns: number[]): number {
    if (returns.length === 0) return 0;
    const avg = returns.reduce((a, b) => a + b, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - avg, 2), 0) / returns.length;
    const stdDev = Math.sqrt(variance);
    return stdDev > 0 ? (avg / stdDev) * Math.sqrt(252) : 0;
  }

  private calculateSortinoRatio(returns: number[]): number {
    if (returns.length === 0) return 0;
    const avg = returns.reduce((a, b) => a + b, 0) / returns.length;
    const downside = returns.filter(r => r < 0);
    const downsideDeviation = Math.sqrt(
      downside.reduce((sum, r) => sum + Math.pow(r, 2), 0) / returns.length
    );
    return downsideDeviation > 0 ? (avg / downsideDeviation) * Math.sqrt(252) : 0;
  }

  async getEquityCurve(userId: string, days: number = 30): Promise<EquityCurvePoint[]> {
    const startDate = startOfDay(addDays(new Date(), -days));

    const snapshots = await prisma.equitySnapshot.findMany({
      where: {
        userId,
        capturedAt: { gte: startDate },
      },
      orderBy: { capturedAt: 'asc' },
    });

    return snapshots.map(s => ({
      timestamp: s.capturedAt.toISOString(),
      balance: s.balance,
      equity: s.equity,
    }));
  }

  async getSymbolPerformance(userId: string): Promise<SymbolPerformance[]> {
    const trades = await prisma.trade.groupBy({
      by: ['symbol'],
      where: {
        userId,
        status: 'CLOSED',
      },
      _count: true,
      _sum: {
        realizedProfit: true,
      },
    });

    const results: SymbolPerformance[] = [];

    for (const t of trades) {
      const symbolTrades = await prisma.trade.findMany({
        where: { userId, status: 'CLOSED', symbol: t.symbol },
        select: { realizedProfit: true },
      });

      const wins = symbolTrades.filter(x => (x.realizedProfit || 0) > 0).length;
      const profit = symbolTrades.filter(x => (x.realizedProfit || 0) > 0)
        .reduce((sum, x) => sum + (x.realizedProfit || 0), 0);
      const loss = Math.abs(symbolTrades.filter(x => (x.realizedProfit || 0) < 0)
        .reduce((sum, x) => sum + (x.realizedProfit || 0), 0));

      results.push({
        symbol: t.symbol,
        trades: t._count,
        winRate: symbolTrades.length > 0 ? (wins / symbolTrades.length) * 100 : 0,
        netPnL: (t._sum.realizedProfit || 0),
        profit,
        loss,
      });
    }

    return results.sort((a, b) => b.netPnL - a.netPnL);
  }

  async getProviderPerformance(userId: string) {
    const trades = await prisma.trade.findMany({
      where: { userId, status: 'CLOSED' },
      include: {
        signal: {
          select: {
            providerId: true,
          },
        },
      },
    });

    const byProvider: Record<string, any> = {};

    for (const trade of trades) {
      const providerId = trade.signal?.providerId || 'manual';
      if (!byProvider[providerId]) {
        byProvider[providerId] = {
          providerId,
          totalSignals: 0,
          executedSignals: 0,
          winningTrades: 0,
          losingTrades: 0,
          netPnL: 0,
        };
      }
      byProvider[providerId].executedSignals++;
      if ((trade.realizedProfit || 0) > 0) byProvider[providerId].winningTrades++;
      else if ((trade.realizedProfit || 0) < 0) byProvider[providerId].losingTrades++;
      byProvider[providerId].netPnL += trade.realizedProfit || 0;
    }

    return Object.values(byProvider).map((p: any) => ({
      ...p,
      winRate: p.executedSignals > 0 ? (p.winningTrades / p.executedSignals) * 100 : 0,
    }));
  }

  async getTradingCalendar(userId: string, year: number, month: number) {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0);

    const trades = await prisma.trade.findMany({
      where: {
        userId,
        status: 'CLOSED',
        closedAt: { gte: start, lte: end },
      },
      select: {
        closedAt: true,
        realizedProfit: true,
      },
    });

    const calendar: Record<string, { trades: number; pnl: number }> = {};

    for (const trade of trades) {
      if (!trade.closedAt) continue;
      const dateKey = trade.closedAt.toISOString().split('T')[0];
      if (!calendar[dateKey]) calendar[dateKey] = { trades: 0, pnl: 0 };
      calendar[dateKey].trades++;
      calendar[dateKey].pnl += trade.realizedProfit || 0;
    }

    return calendar;
  }

  async getExecutionLatencyStats(userId: string) {
    const events = await prisma.tradeEvent.findMany({
      where: {
        trade: { userId },
        eventType: { in: ['EXECUTION_REQUESTED', 'EXECUTED'] },
      },
      orderBy: { createdAt: 'asc' },
    });

    const latencies: number[] = [];
    const requestMap: Record<string, Date> = {};

    for (const event of events) {
      if (event.eventType === 'EXECUTION_REQUESTED') {
        requestMap[event.tradeId] = event.createdAt;
      } else if (event.eventType === 'EXECUTED' && requestMap[event.tradeId]) {
        const latency = event.createdAt.getTime() - requestMap[event.tradeId].getTime();
        latencies.push(latency);
      }
    }

    if (latencies.length === 0) {
      return { average: 0, min: 0, max: 0, p95: 0 };
    }

    latencies.sort((a, b) => a - b);
    const p95Index = Math.floor(latencies.length * 0.95);

    return {
      average: latencies.reduce((a, b) => a + b, 0) / latencies.length,
      min: latencies[0],
      max: latencies[latencies.length - 1],
      p95: latencies[p95Index],
    };
  }
}

export const analyticsService = new AnalyticsService();