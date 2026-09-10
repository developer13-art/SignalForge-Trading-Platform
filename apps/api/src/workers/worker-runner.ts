import { startSignalWorker } from './signal.worker';
import { startAiWorker } from './ai.worker';
import { startExecutionWorker } from './execution.worker';
import { startNotificationWorker } from './notification.worker';
import { startKycWorker } from './kyc.worker';
import { startReferralWorker } from './referral.worker';
import { startAccountSyncWorker } from './account-sync.worker';
import { accountSyncQueue } from '../queues/account-sync.queue';
import { logger } from '@signalforge/logger';

export async function startAllWorkers() {
  logger.info('🚀 Starting all workers...');

  const workers = [
    startSignalWorker(),
    startAiWorker(),
    startExecutionWorker(),
    startNotificationWorker(),
    startKycWorker(),
    startReferralWorker(),
    startAccountSyncWorker(),
  ];

  logger.info(`✅ Started ${workers.length} workers`);

  try {
    await accountSyncQueue.addSyncAll();
    logger.info('Scheduled account sync jobs');
  } catch (error) {
    logger.debug('Account sync scheduling (may already exist)');
  }

  return workers;
}