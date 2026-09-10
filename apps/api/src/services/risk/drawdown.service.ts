import { prisma } from '../../config/database';

export class DrawdownService {
  async calculateCurrentDrawdown(userId: string): Promise<{ amount: number; percent: number }> {
    const trades = await prisma.trade.findMany({
      where: { userId, status: 'CLOSED' },
      orderBy: { closedAt: 'asc' },
      select: { realizedProfit: true },
    });

    let peak = 0;
    let running = 0;
    let maxDD = 0;

    for (const trade of trades) {
      running += trade.realizedProfit || 0;
      if (running > peak) peak = running;
      const dd = peak - running;
      if (dd > maxDD) maxDD = dd;
    }

    return {
      amount: maxDD,
      percent: peak > 0 ? (maxDD / peak) * 100 : 0,
    };
  }

  async checkDrawdownLimit(userId: string, maxDrawdownPercent: number): Promise<boolean> {
    const dd = await this.calculateCurrentDrawdown(userId);
    return dd.percent < maxDrawdownPercent;
  }
}

export const drawdownService = new DrawdownService();