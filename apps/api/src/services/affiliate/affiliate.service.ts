import { prisma } from '../../config/database';

export class AffiliateService {
  async getPartner(userId: string) {
    return prisma.affiliatePartner.findFirst({ where: { userId } });
  }

  async createPartner(userId: string, code: string) {
    return prisma.affiliatePartner.create({
      data: { userId, code, commissionRate: 0.1 },
    });
  }
}

export const affiliateService = new AffiliateService();