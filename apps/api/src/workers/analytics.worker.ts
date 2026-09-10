import { Worker, Job } from 'bullmq';
import { redis } from '../config/redis';
import { analyticsService } from '../services/analytics/analytics.service';
import { logger } from '@signalforge/logger';

export function startAnalyticsWorker() {
  const worker = new Worker('analytics', async (job: Job) => {
    switch (job.name) {
      case 'snapshot': {
        const { userId } = job.data;
        const metrics = await analyticsService.getPerformanceMetrics(userId);
        logger.debug(`Snapshot for user ${userId}`, metrics);
        return metrics;
      }

      case 'calculate-metrics': {
        const { userId } = job.data;
        return analyticsService.getPerformanceMetrics(userId);
      }

      case 'daily-report': {
        const { userId } = job.data;
        return analyticsService.getPerformanceMetrics(userId);
      }

      default:
        throw new Error(`Unknown job: ${job.name}`);
    }
  }, {
    connection: redis,
    concurrency: 5,
  });

  worker.on('failed', (job, err) => {
    logger.error(`Analytics job failed: ${job?.id}`, err);
  });

  return worker;
}