import { prisma } from '../../config/database';

export class WithdrawalService {
  async request(userId: string, amount: number, method: string) {
    return prisma.withdrawalRequest.create({
      data: {
        userId,
        amount,
        status: 'PENDING',
        paymentDetails: { method },
      },
    });
  }

  async getHistory(userId: string) {
    return prisma.withdrawalRequest.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}

export const withdrawalService = new WithdrawalService();