import { brokerSyncService } from '../services/brokers/sync.service';
import { logger } from '@signalforge/logger';

export async function runAccountSyncJob() {
  logger.info('Running account sync job');
  try {
    await brokerSyncService.syncAllAccounts();
    logger.info('Account sync complete');
  } catch (error) {
    logger.error('Account sync failed:', error);
  }
}