import { prisma } from '../../config/database';

export class TradingService {
  async getUserTrades(userId: string, limit: number = 50) {
    return prisma.trade.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async getOpenPositions(userId: string) {
    return prisma.trade.findMany({
      where: { userId, status: 'OPEN' },
      orderBy: { openedAt: 'desc' },
    });
  }

  async getTradeDetails(userId: string, tradeId: string) {
    return prisma.trade.findFirst({
      where: { id: tradeId, userId },
      include: {
        events: { orderBy: { createdAt: 'asc' } },
        signal: true,
        brokerAccount: true,
      },
    });
  }
}

export const tradingService = new TradingService();