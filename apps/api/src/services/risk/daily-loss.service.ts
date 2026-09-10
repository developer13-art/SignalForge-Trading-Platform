import { prisma } from '../../config/database';
import { startOfDay, endOfDay } from '../../utils/date';

export class DailyLossService {
  async getDailyLoss(userId: string, brokerAccountId?: string): Promise<number> {
    const today = new Date();
    const trades = await prisma.trade.findMany({
      where: {
        userId,
        ...(brokerAccountId && { brokerAccountId }),
        status: 'CLOSED',
        closedAt: { gte: startOfDay(today), lte: endOfDay(today) },
      },
      select: { realizedProfit: true },
    });

    const total = trades.reduce((sum, t) => sum + (t.realizedProfit || 0), 0);
    return total < 0 ? Math.abs(total) : 0;
  }

  async checkDailyLossLimit(userId: string, maxLossPercent: number, accountId: string): Promise<boolean> {
    const account = await prisma.brokerAccount.findUnique({
      where: { id: accountId },
      select: { balance: true },
    });
    if (!account) return false;

    const dailyLoss = await this.getDailyLoss(userId, accountId);
    const maxLoss = (account.balance * maxLossPercent) / 100;
    return dailyLoss < maxLoss;
  }
}

export const dailyLossService = new DailyLossService();