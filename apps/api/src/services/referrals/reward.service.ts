import { prisma } from '../../config/database';

export class ReferralRewardService {
  async getRewards(userId: string) {
    return prisma.referralReward.findMany({
      where: { referrerId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createReward(data: {
    referrerId: string;
    referredUserId: string;
    performancePeriodId: string;
    eligibleNetProfit: number;
    rewardRate: number;
    rewardAmount: number;
  }) {
    return prisma.referralReward.create({ data });
  }
}

export const referralRewardService = new ReferralRewardService();