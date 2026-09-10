import { prisma } from '../../config/database';

export class CommissionService {
  async getCommissions(affiliateId: string) {
    return prisma.affiliateCommission.findMany({
      where: { affiliateId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createCommission(affiliateId: string, amount: number) {
    return prisma.affiliateCommission.create({
      data: { affiliateId, amount, status: 'PENDING' },
    });
  }
}

export const commissionService = new CommissionService();