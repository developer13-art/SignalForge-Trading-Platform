import { prisma } from '../../config/database';

export class TradeEventService {
  async create(tradeId: string, eventType: string, actor: string, metadata?: any) {
    return prisma.tradeEvent.create({
      data: { tradeId, eventType, actor, metadata },
    });
  }

  async getEvents(tradeId: string) {
    return prisma.tradeEvent.findMany({
      where: { tradeId },
      orderBy: { createdAt: 'asc' },
    });
  }
}

export const tradeEventService = new TradeEventService();