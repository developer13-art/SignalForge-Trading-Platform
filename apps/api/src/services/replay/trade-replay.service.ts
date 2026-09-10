import { prisma } from '../../config/database';

export class TradeReplayService {
  async replay(tradeId: string) {
    return prisma.trade.findUnique({
      where: { id: tradeId },
      include: { events: { orderBy: { createdAt: 'asc' } } },
    });
  }
}

export const tradeReplayService = new TradeReplayService();