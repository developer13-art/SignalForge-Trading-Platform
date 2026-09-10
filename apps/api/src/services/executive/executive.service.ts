import { prisma } from '../../config/database';

export class ExecutiveService {
  async getOverview() {
    const [users, providers, trades, revenue] = await Promise.all([
      prisma.user.count(),
      prisma.provider.count(),
      prisma.trade.count(),
      prisma.payment.aggregate({
        where: { status: 'SUCCESS' },
        _sum: { amount: true },
      }),
    ]);
    return { users, providers, trades, revenue: revenue._sum.amount || 0 };
  }
}

export const executiveService = new ExecutiveService();