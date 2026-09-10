import { prisma } from '../../config/database';

export class TradingReplayService {
  async replayTrade(tradeId: string) {
    const trade = await prisma.trade.findUnique({
      where: { id: tradeId },
      include: { events: { orderBy: { createdAt: 'asc' } } },
    });
    return trade;
  }

  async getTimeline(tradeId: string) {
    const events = await prisma.tradeEvent.findMany({
      where: { tradeId },
      orderBy: { createdAt: 'asc' },
    });

    return events.map((e, i) => ({
      index: i,
      eventType: e.eventType,
      actor: e.actor,
      timestamp: e.createdAt,
      metadata: e.metadata,
    }));
  }
}

export const tradingReplayService = new TradingReplayService();