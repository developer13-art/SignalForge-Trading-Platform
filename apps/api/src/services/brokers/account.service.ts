import { prisma } from '../../config/database';
import { AppError } from '../../middleware/error.middleware';

export class BrokerAccountService {
  async list(userId: string) {
    return prisma.brokerAccount.findMany({
      where: { userId },
      include: { broker: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getById(userId: string, accountId: string) {
    const account = await prisma.brokerAccount.findFirst({
      where: { id: accountId, userId },
      include: { broker: true, snapshots: { orderBy: { capturedAt: 'desc' }, take: 30 } },
    });
    if (!account) throw new AppError('Account not found', 404);
    return account;
  }

  async update(id: string, data: any) {
    return prisma.brokerAccount.update({ where: { id }, data });
  }
}

export const brokerAccountService = new BrokerAccountService();