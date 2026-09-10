import { prisma } from '../../config/database';

export class AffiliateTrackingService {
  async trackReferral(affiliateId: string, referredUserId: string) {
    return prisma.affiliateReferral.create({
      data: { affiliateId, referredUserId },
    });
  }

  async getReferrals(affiliateId: string) {
    return prisma.affiliateReferral.findMany({
      where: { affiliateId },
    });
  }
}

export const affiliateTrackingService = new AffiliateTrackingService();