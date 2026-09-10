import { Queue } from 'bullmq';
import { redis } from '../config/redis';

export const analyticsQueue = new Queue('analytics', {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 2000 },
    removeOnComplete: { age: 86400, count: 1000 },
    removeOnFail: { age: 604800 },
  },
});

export const analyticsQueueHelpers = {
  async scheduleSnapshot(userId: string) {
    return analyticsQueue.add('snapshot', { userId });
  },

  async scheduleMetricsCalculation(userId: string) {
    return analyticsQueue.add('calculate-metrics', { userId });
  },

  async scheduleDailyReport(userId: string) {
    return analyticsQueue.add('daily-report', { userId });
  },
};