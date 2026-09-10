import { prisma } from '../../config/database';
import { metaApiClient } from '../../integrations/metaapi/client';
import { riskService } from '../risk/risk.service';
import { AppError } from '../../middleware/error.middleware';
import { logger } from '@signalforge/logger';
import { TradeExecutionRequest, TradeExecutionResult } from '../../types/execution.types';
import { encrypt } from '../../utils/encryption';

export class ExecutionService {
  async executeSignal(request: TradeExecutionRequest): Promise<TradeExecutionResult> {
    const { signalId, userId, brokerAccountId, symbol, direction, volume, entryPrice, stopLoss, takeProfit } = request;

    const account = await prisma.brokerAccount.findFirst({
      where: { id: brokerAccountId, userId },
    });

    if (!account) {
      throw new AppError('Broker account not found', 404);
    }

    if (!account.metaapiAccountId) {
      throw new AppError('Broker account not connected to MetaApi', 400);
    }

    // Create trade record first (PENDING status)
    const trade = await prisma.trade.create({
      data: {
        userId,
        brokerAccountId,
        signalId,
        symbol,
        direction,
        volume,
        entryPrice: entryPrice || null,
        stopLoss: stopLoss || null,
        takeProfit: takeProfit || null,
        status: 'PENDING',
        magicNumber: Math.floor(Math.random() * 1000000),
      },
    });

    // Create trade event
    await prisma.tradeEvent.create({
      data: {
        tradeId: trade.id,
        eventType: 'EXECUTION_REQUESTED',
        actor: 'SYSTEM',
        metadata: { request } as any,
      },
    });

    try {
      // Execute on MetaApi
      const orderType = direction === 'BUY' ? 'ORDER_TYPE_BUY' : 'ORDER_TYPE_SELL';

      const result = await metaApiClient.createMarketOrder(account.metaapiAccountId, {
        symbol,
        volume,
        type: orderType,
        stopLoss,
        takeProfit,
        comment: `SF-${trade.id.slice(0, 8)}`,
        magic: trade.magicNumber || undefined,
      });

      // Update trade with broker response
      await prisma.trade.update({
        where: { id: trade.id },
        data: {
          status: 'OPEN',
          ticketNumber: result.orderId || result.positionId,
          openedAt: new Date(),
        },
      });

      await prisma.tradeEvent.create({
        data: {
          tradeId: trade.id,
          eventType: 'EXECUTED',
          actor: 'SYSTEM',
          metadata: { brokerResponse: result } as any,
        },
      });

      logger.info(`Trade executed: ${trade.id} (${symbol} ${direction} ${volume})`);

      return {
        success: true,
        tradeId: trade.id,
        ticketNumber: result.orderId || result.positionId,
        executedPrice: result.openPrice,
        brokerResponse: result,
      };
    } catch (error: any) {
      // Update trade as failed
      await prisma.trade.update({
        where: { id: trade.id },
        data: {
          status: 'FAILED',
        },
      });

      await prisma.tradeEvent.create({
        data: {
          tradeId: trade.id,
          eventType: 'EXECUTION_FAILED',
          actor: 'SYSTEM',
          metadata: { error: error.message, response: error.response?.data } as any,
        },
      });

      logger.error(`Trade execution failed: ${trade.id}`, error);

      return {
        success: false,
        tradeId: trade.id,
        error: error.response?.data?.message || error.message,
        brokerResponse: error.response?.data,
      };
    }
  }

  async closePosition(userId: string, tradeId: string, volume?: number) {
    const trade = await prisma.trade.findFirst({
      where: { id: tradeId, userId },
      include: { brokerAccount: true },
    });

    if (!trade || trade.status !== 'OPEN') {
      throw new AppError('Open trade not found', 404);
    }

    if (!trade.brokerAccount.metaapiAccountId || !trade.ticketNumber) {
      throw new AppError('Trade not connected to broker', 400);
    }

    try {
      const result = await metaApiClient.closePosition(
        trade.brokerAccount.metaapiAccountId,
        trade.ticketNumber,
        volume
      );

      if (!volume || volume >= trade.volume) {
        await prisma.trade.update({
          where: { id: tradeId },
          data: {
            status: 'CLOSED',
            closedAt: new Date(),
            exitPrice: result.closePrice,
            realizedProfit: result.profit,
          },
        });

        await prisma.tradeEvent.create({
          data: {
            tradeId,
            eventType: 'CLOSED',
            actor: 'USER',
            metadata: { result } as any,
          },
        });
      } else {
        // Partial close
        await prisma.trade.update({
          where: { id: tradeId },
          data: {
            volume: trade.volume - volume,
          },
        });

        await prisma.tradeEvent.create({
          data: {
            tradeId,
            eventType: 'PARTIAL_CLOSE',
            actor: 'USER',
            metadata: { closedVolume: volume, result } as any,
          },
        });
      }

      return { success: true, result };
    } catch (error: any) {
      logger.error(`Close position failed: ${tradeId}`, error);
      throw new AppError(error.response?.data?.message || 'Failed to close position', 500);
    }
  }

  async modifyPosition(userId: string, tradeId: string, data: { stopLoss?: number; takeProfit?: number }) {
    const trade = await prisma.trade.findFirst({
      where: { id: tradeId, userId, status: 'OPEN' },
      include: { brokerAccount: true },
    });

    if (!trade || !trade.ticketNumber || !trade.brokerAccount.metaapiAccountId) {
      throw new AppError('Trade not found or not connected', 404);
    }

    const result = await metaApiClient.modifyPosition(
      trade.brokerAccount.metaapiAccountId,
      trade.ticketNumber,
      data
    );

    await prisma.trade.update({
      where: { id: tradeId },
      data: {
        stopLoss: data.stopLoss !== undefined ? data.stopLoss : trade.stopLoss,
        takeProfit: data.takeProfit !== undefined ? data.takeProfit : trade.takeProfit,
      },
    });

    await prisma.tradeEvent.create({
      data: {
        tradeId,
        eventType: data.stopLoss !== undefined ? 'SL_MODIFIED' : 'TP_MODIFIED',
        actor: 'USER',
        metadata: data as any,
      },
    });

    return { success: true, result };
  }

  async moveToBreakEven(userId: string, tradeId: string) {
    const trade = await prisma.trade.findFirst({
      where: { id: tradeId, userId, status: 'OPEN' },
    });

    if (!trade || !trade.entryPrice) {
      throw new AppError('Trade not found or entry price missing', 404);
    }

    return this.modifyPosition(userId, tradeId, { stopLoss: trade.entryPrice });
  }

  async syncAccountState(accountId: string) {
    const account = await prisma.brokerAccount.findUnique({
      where: { id: accountId },
    });

    if (!account || !account.metaapiAccountId) {
      throw new AppError('Account not found or not connected', 404);
    }

    try {
      const [info, positions] = await Promise.all([
        metaApiClient.getAccountInformation(account.metaapiAccountId),
        metaApiClient.getPositions(account.metaapiAccountId),
      ]);

      // Update account metrics
      await prisma.brokerAccount.update({
        where: { id: accountId },
        data: {
          balance: info.balance,
          equity: info.equity,
          margin: info.margin,
          freeMargin: info.freeMargin,
          leverage: info.leverage,
          currency: info.currency,
          lastSyncAt: new Date(),
        },
      });

      // Snapshot
      await prisma.accountSnapshot.create({
        data: {
          brokerAccountId: accountId,
          balance: info.balance,
          equity: info.equity,
          margin: info.margin,
          freeMargin: info.freeMargin,
          openPositions: positions.length,
        },
      });

      logger.info(`Account ${accountId} synced: ${positions.length} positions`);

      return { info, positions };
    } catch (error: any) {
      logger.error(`Sync failed for account ${accountId}:`, error);
      throw new AppError('Failed to sync account', 500);
    }
  }
}

export const executionService = new ExecutionService();