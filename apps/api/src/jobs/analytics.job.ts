import { prisma } from '../config/database';
import { analyticsQueue } from '../queues/analytics.queue';
import { logger } from '@signalforge/logger';

export async function runAnalyticsJob() {
  logger.info('Running analytics job');

  const users = await prisma.user.findMany({
    where: { status: 'ACTIVE' },
    select: { id: true },
  });

  for (const user of users) {
    await analyticsQueue.add('calculate-metrics', { userId: user.id });
  }

  logger.info(`Queued analytics for ${users.length} users`);
}