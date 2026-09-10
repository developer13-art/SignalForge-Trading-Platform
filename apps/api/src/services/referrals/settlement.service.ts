import { prisma } from '../../config/database';
import { logger } from '@signalforge/logger';

export class ReferralSettlementService {
  async settle(periodStart: Date, periodEnd: Date) {
    const rewards = await prisma.referralReward.findMany({
      where: {
        status: 'APPROVED',
        settledAt: null,
        createdAt: { gte: periodStart, lte: periodEnd },
      },
    });

    let total = 0;

    for (const reward of rewards) {
      let wallet = await prisma.referralWallet.findUnique({
        where: { userId: reward.referrerId },
      });

      if (!wallet) {
        wallet = await prisma.referralWallet.create({
          data: { userId: reward.referrerId },
        });
      }

      await prisma.referralWallet.update({
        where: { userId: reward.referrerId },
        data: {
          availableBalance: wallet.availableBalance + reward.rewardAmount,
          lifetimeEarned: wallet.lifetimeEarned + reward.rewardAmount,
        },
      });

      await prisma.referralLedger.create({
        data: {
          walletId: wallet.id,
          entryType: 'CREDIT',
          amount: reward.rewardAmount,
          reference: `reward_${reward.id}`,
        },
      });

      await prisma.referralReward.update({
        where: { id: reward.id },
        data: { status: 'SETTLED', settledAt: new Date() },
      });

      total += reward.rewardAmount;
    }

    await prisma.referralSettlement.create({
      data: {
        periodStart,
        periodEnd,
        totalRewards: total,
        totalReferrers: new Set(rewards.map(r => r.referrerId)).size,
        status: 'COMPLETED',
        settledAt: new Date(),
      },
    });

    logger.info(`Settled ${rewards.length} rewards totaling $${total.toFixed(2)}`);
    return { total, count: rewards.length };
  }
}

export const referralSettlementService = new ReferralSettlementService();