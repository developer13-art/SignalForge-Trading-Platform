import { prisma } from '../config/database';
import { logger } from '@signalforge/logger';

export async function runCleanupJob() {
  logger.info('Running cleanup job');

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  // Clean old completed jobs
  const deletedJobs = await prisma.job.deleteMany({
    where: {
      status: 'COMPLETED',
      completedAt: { lt: thirtyDaysAgo },
    },
  });

  // Clean old sessions
  const deletedSessions = await prisma.userSession.deleteMany({
    where: {
      revokedAt: { not: null, lt: thirtyDaysAgo },
    },
  });

  logger.info(`Cleanup complete: ${deletedJobs.count} jobs, ${deletedSessions.count} sessions`);
}