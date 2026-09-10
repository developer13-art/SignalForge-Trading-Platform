import { Job } from 'bullmq';
import { createWorker, QUEUE_NAMES } from '../queues/queue';
import { referralService } from '../services/referrals/referral.service';
import { logger } from '@signalforge/logger';

export function startReferralWorker() {
  return createWorker(QUEUE_NAMES.REFERRAL, async (job: Job) => {
    switch (job.name) {
      case 'calculate-rewards': {
        const result = await referralService.calculateMonthlyRewards(
          new Date(job.data.periodStart),
          new Date(job.data.periodEnd)
        );
        logger.info(`Calculated ${result.rewardsCreated} referral rewards`);
        return result;
      }
      
      case 'monthly-settlement': {
        const result = await referralService.settleRewards(
          new Date(job.data.periodStart),
          new Date(job.data.periodEnd)
        );
        logger.info(`Settled ${result.rewardsSettled} rewards totaling $${result.totalSettled}`);
        return result;
      }
      
      default:
        throw new Error(`Unknown job: ${job.name}`);
    }
  });
}