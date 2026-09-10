import { prisma } from '../../config/database';

export class PnlService {
  async getTotalPnl(userId: string): Promise<number> {
    const trades = await prisma.trade.findMany({
      where: { userId, status: 'CLOSED' },
      select: { realizedProfit: true },
    });
    return trades.reduce((sum, t) => sum + (t.realizedProfit || 0), 0);
  }

  async getDailyPnl(userId: string, days: number = 30) {
    const result = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const start = new Date(date.setHours(0, 0, 0, 0));
      const end = new Date(date.setHours(23, 59, 59, 999));

      const trades = await prisma.trade.findMany({
        where: {
          userId,
          status: 'CLOSED',
          closedAt: { gte: start, lte: end },
        },
        select: { realizedProfit: true },
      });

      result.push({
        date: date.toISOString().split('T')[0],
        pnl: trades.reduce((sum, t) => sum + (t.realizedProfit || 0), 0),
      });
    }

    return result;
  }
}

export const pnlService = new PnlService();