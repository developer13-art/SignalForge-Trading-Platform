import { prisma } from '../../config/database';

export class ReferralTrackingService {
  async getRelationships(userId: string) {
    return prisma.referralRelationship.findMany({
      where: { referrerId: userId },
      include: { referredUser: { select: { email: true, firstName: true, lastName: true, kycStatus: true } } },
    });
  }

  async createRelationship(referrerId: string, referredUserId: string) {
    return prisma.referralRelationship.create({
      data: { referrerId, referredUserId },
    });
  }
}

export const referralTrackingService = new ReferralTrackingService();