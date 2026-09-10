import { queues, QUEUE_NAMES } from './queue';

export const referralQueue = {
  async addMonthlySettlement(periodStart: string, periodEnd: string) {
    return queues[QUEUE_NAMES.REFERRAL].add('monthly-settlement', {
      periodStart,
      periodEnd,
    });
  },

  async addCalculateRewards(periodStart: string, periodEnd: string) {
    return queues[QUEUE_NAMES.REFERRAL].add('calculate-rewards', {
      periodStart,
      periodEnd,
    });
  },
};