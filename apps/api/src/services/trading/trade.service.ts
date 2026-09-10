import { prisma } from '../../config/database';
import { AppError } from '../../middleware/error.middleware';

export class TradeService {
  async list(userId: string, status?: string) {
    return prisma.trade.findMany({
      where: { userId, ...(status && { status }) },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getById(userId: string, id: string) {
    const trade = await prisma.trade.findFirst({
      where: { id, userId },
      include: {
        events: { orderBy: { createdAt: 'asc' } },
      },
    });
    if (!trade) throw new AppError('Trade not found', 404);
    return trade;
  }

  async update(id: string, data: any) {
    return prisma.trade.update({ where: { id }, data });
  }
}

export const tradeService = new TradeService();