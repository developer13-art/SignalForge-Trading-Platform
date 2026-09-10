import { prisma } from '../../config/database';

export class ConsistencyAnalysisService {
  async analyze(userId: string): Promise<number> {
    const trades = await prisma.trade.findMany({
      where: { userId, status: 'CLOSED' },
      select: { realizedProfit: true },
    });
    if (trades.length < 5) return 0;

    const wins = trades.filter(t => (t.realizedProfit || 0) > 0).length;
    const rate = wins / trades.length;
    return Math.abs(rate - 0.5) * 200;
  }
}

export const consistencyService = new ConsistencyAnalysisService();