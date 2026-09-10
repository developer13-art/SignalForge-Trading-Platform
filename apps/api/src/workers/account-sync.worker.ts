import { Job } from 'bullmq';
import { createWorker, QUEUE_NAMES } from '../queues/queue';
import { executionService } from '../services/trading/execution.service';
import { prisma } from '../config/database';
import { logger } from '@signalforge/logger';

export function startAccountSyncWorker() {
  return createWorker(QUEUE_NAMES.ACCOUNT_SYNC, async (job: Job) => {
    if (job.name === 'sync-all') {
      const accounts = await prisma.brokerAccount.findMany({
        where: {
          status: 'CONNECTED',
          metaapiAccountId: { not: null },
        },
      });
      
      logger.info(`Syncing ${accounts.length} accounts`);
      
      const results = await Promise.allSettled(
        accounts.map(a => executionService.syncAccountState(a.id))
      );
      
      const succeeded = results.filter(r => r.status === 'fulfilled').length;
      return { total: accounts.length, succeeded };
    }
    
    if (job.name === 'sync-account') {
      return executionService.syncAccountState(job.data.accountId);
    }
    
    throw new Error(`Unknown job: ${job.name}`);
  }, { concurrency: 5 });
}