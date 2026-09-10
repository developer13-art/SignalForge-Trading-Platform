import { prisma } from '../../config/database';
import { riskService } from '../risk/risk.service';
import { executionService } from '../trading/execution.service';
import { logger } from '@signalforge/logger';
import { EntryType, SignalDirection } from '@signalforge/shared';

export class FanoutService {
  async fanoutSignal(signalId: string) {
    const signal = await prisma.signal.findUnique({
      where: { id: signalId },
      include: {
        sourceMessage: {
          include: {
            signalSource: {
              include: {
                user: {
                  include: {
                    providerSubs: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!signal) {
      throw new Error('Signal not found');
    }

    // Find all subscribers to this provider
    const subscribers = await prisma.providerSubscription.findMany({
      where: {
        providerId: signal.providerId || '',
        isActive: true,
      },
      include: {
        user: true,
      },
    });

    logger.info(`Fanning out signal ${signalId} to ${subscribers.length} subscribers`);

    // Process each subscriber
    const results = await Promise.allSettled(
      subscribers.map(sub => this.processSubscriber(sub, signal))
    );

    return {
      total: subscribers.length,
      successful: results.filter(r => r.status === 'fulfilled').length,
      failed: results.filter(r => r.status === 'rejected').length,
    };
  }

  private async processSubscriber(subscription: any, signal: any) {
    try {
      const userId = subscription.userId;

      // Get user's default broker account
      const account = await prisma.brokerAccount.findFirst({
        where: { userId, status: 'CONNECTED' },
      });

      if (!account) {
        logger.debug(`No connected account for user ${userId}`);
        return;
      }

      // Run risk evaluation
      const riskDecision = await riskService.evaluateSignal(
        userId,
        {
          id: signal.id,
          symbol: signal.symbol,
          direction: signal.direction,
          confidence: signal.confidence,
          stopLoss: signal.stopLoss,
          entryPrice: signal.entryPrice,
        },
        account.id
      );

      if (!riskDecision.approved) {
        logger.debug(`Signal ${signal.id} rejected for user ${userId}: ${riskDecision.reasons.join(', ')}`);
        return;
      }

      // Calculate position size
      const profile = await riskService.getRiskProfile(userId);
      const stopLossPips = this.calculatePips(signal.symbol, signal.entryPrice, signal.stopLoss);
      const volume = riskService.calculatePositionSize(
        account.balance,
        profile.riskPercent,
        stopLossPips || 50
      );

      // Execute
      await executionService.executeSignal({
        signalId: signal.id,
        userId,
        brokerAccountId: account.id,
        symbol: signal.symbol!,
        direction: signal.direction as 'BUY' | 'SELL',
        volume,
        entryPrice: signal.entryPrice || undefined,
        stopLoss: signal.stopLoss || undefined,
        takeProfit: signal.takeProfit1 || undefined,
      });

      logger.info(`Signal executed for user ${userId}`);
    } catch (error) {
      logger.error(`Fanout failed for subscriber:`, error);
      throw error;
    }
  }

  private calculatePips(symbol: string | null, entry: number | null, sl: number | null): number {
    if (!entry || !sl) return 0;

    const pipSize = this.getPipSize(symbol);
    return Math.abs(entry - sl) / pipSize;
  }

  private getPipSize(symbol: string | null): number {
    if (!symbol) return 0.0001;
    if (symbol.includes('JPY')) return 0.01;
    if (symbol.includes('XAU') || symbol.includes('GOLD')) return 0.1;
    return 0.0001;
  }
}

export const fanoutService = new FanoutService();