import { prisma } from '../../config/database';
import { AppError } from '../../middleware/error.middleware';
import { logger } from '@signalforge/logger';
import { generateReferralCode } from '../../utils/hashing';
import { startOfMonth, endOfMonth } from '../../utils/date';
import { env } from '../../config/env';

export class ReferralService {
  async getOrCreateReferralCode(userId: string) {
    let code = await prisma.referralCode.findUnique({
      where: { userId },
    });

    if (!code) {
      let uniqueCode = '';
      let isUnique = false;
      while (!isUnique) {
        uniqueCode = generateReferralCode();
        const existing = await prisma.referralCode.findUnique({
          where: { code: uniqueCode },
        });
        if (!existing) isUnique = true;
      }

      code = await prisma.referralCode.create({
        data: {
          userId,
          code: uniqueCode,
        },
      });
    }

    return code;
  }

  async getReferralDashboard(userId: string) {
    const code = await this.getOrCreateReferralCode(userId);

    const [relationships, wallet, rewards] = await Promise.all([
      prisma.referralRelationship.findMany({
        where: { referrerId: userId },
        include: {
          referredUser: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              createdAt: true,
              kycStatus: true,
            },
          },
        },
      }),
      prisma.referralWallet.findUnique({ where: { userId } }),
      prisma.referralReward.findMany({
        where: { referrerId: userId },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
    ]);

    const activeReferrals = relationships.filter(r => r.referredUser.kycStatus === 'VERIFIED').length;

    return {
      referralCode: code.code,
      referralLink: `${env.APP_URL}/register?ref=${code.code}`,
      totalReferrals: relationships.length,
      activeReferrals,
      wallet: wallet || { pendingBalance: 0, availableBalance: 0, lifetimeEarned: 0 },
      recentRewards: rewards,
      referredUsers: relationships.map(r => ({
        id: r.referredUser.id,
        name: `${r.referredUser.firstName} ${r.referredUser.lastName}`,
        email: r.referredUser.email,
        joinedAt: r.referredUser.createdAt,
        kycStatus: r.referredUser.kycStatus,
      })),
    };
  }

  async calculateMonthlyRewards(periodStart: Date, periodEnd: Date) {
    // Find all performance periods for the given month
    const performancePeriods = await prisma.performancePeriod.findMany({
      where: {
        periodStart: { gte: periodStart },
        periodEnd: { lte: periodEnd },
        status: 'CLOSED',
      },
    });

    logger.info(`Processing ${performancePeriods.length} performance periods`);

    let rewardsCreated = 0;

    for (const period of performancePeriods) {
      // Find the referrer for this user
      const relationship = await prisma.referralRelationship.findUnique({
        where: { referredUserId: period.userId },
      });

      if (!relationship) continue;

      const eligibleNetProfit = Math.max(0, period.eligibleNetProfit);
      const rewardAmount = eligibleNetProfit * env.REFERRAL_REWARD_RATE;

      if (rewardAmount <= 0) continue;

      await prisma.referralReward.create({
        data: {
          referrerId: relationship.referrerId,
          referredUserId: period.userId,
          performancePeriodId: period.id,
          eligibleNetProfit,
          rewardRate: env.REFERRAL_REWARD_RATE,
          rewardAmount,
          status: 'PENDING',
        },
      });

      rewardsCreated++;
    }

    logger.info(`Created ${rewardsCreated} referral rewards`);

    return { rewardsCreated };
  }

  async approveReward(rewardId: string, adminId: string) {
    const reward = await prisma.referralReward.findUnique({
      where: { id: rewardId },
    });

    if (!reward) {
      throw new AppError('Reward not found', 404);
    }

    if (reward.status !== 'PENDING') {
      throw new AppError('Reward is not pending', 400);
    }

    return prisma.referralReward.update({
      where: { id: rewardId },
      data: {
        status: 'APPROVED',
        approvedAt: new Date(),
      },
    });
  }

  async settleRewards(periodStart: Date, periodEnd: Date) {
    const pendingRewards = await prisma.referralReward.findMany({
      where: {
        status: 'APPROVED',
        settledAt: null,
        createdAt: { gte: periodStart, lte: periodEnd },
      },
    });

    let totalSettled = 0;

    for (const reward of pendingRewards) {
      // Get or create wallet
      let wallet = await prisma.referralWallet.findUnique({
        where: { userId: reward.referrerId },
      });

      if (!wallet) {
        wallet = await prisma.referralWallet.create({
          data: { userId: reward.referrerId },
        });
      }

      // Update wallet
      await prisma.referralWallet.update({
        where: { userId: reward.referrerId },
        data: {
          availableBalance: wallet.availableBalance + reward.rewardAmount,
          lifetimeEarned: wallet.lifetimeEarned + reward.rewardAmount,
        },
      });

      // Create ledger entry
      await prisma.referralLedger.create({
        data: {
          walletId: wallet.id,
          entryType: 'CREDIT',
          amount: reward.rewardAmount,
          reference: `reward_${reward.id}`,
          description: `Referral reward for period ${periodStart.toISOString().split('T')[0]}`,
        },
      });

      // Mark reward as settled
      await prisma.referralReward.update({
        where: { id: reward.id },
        data: {
          status: 'SETTLED',
          settledAt: new Date(),
        },
      });

      totalSettled += reward.rewardAmount;
    }

    // Create settlement record
    await prisma.referralSettlement.create({
      data: {
        periodStart,
        periodEnd,
        totalRewards: totalSettled,
        totalReferrers: new Set(pendingRewards.map(r => r.referrerId)).size,
        status: 'COMPLETED',
        settledAt: new Date(),
      },
    });

    logger.info(`Settled ${pendingRewards.length} rewards totaling $${totalSettled.toFixed(2)}`);

    return { totalSettled, rewardsSettled: pendingRewards.length };
  }

  async getReferralWallet(userId: string) {
    let wallet = await prisma.referralWallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      wallet = await prisma.referralWallet.create({
        data: { userId },
      });
    }

    const ledger = await prisma.referralLedger.findMany({
      where: { walletId: wallet.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return { wallet, ledger };
  }

  async getReferralRewards(userId: string) {
    return prisma.referralReward.findMany({
      where: { referrerId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getLeaderboard(limit: number = 10) {
    const wallets = await prisma.referralWallet.findMany({
      orderBy: { lifetimeEarned: 'desc' },
      take: limit,
      include: {
        user: {
          select: { firstName: true, lastName: true, avatarUrl: true },
        },
      },
    });

    return wallets.map((w, index) => ({
      rank: index + 1,
      user: {
        name: `${w.user.firstName} ${w.user.lastName}`,
        avatarUrl: w.user.avatarUrl,
      },
      lifetimeEarned: w.lifetimeEarned,
    }));
  }
}

export const referralService = new ReferralService();