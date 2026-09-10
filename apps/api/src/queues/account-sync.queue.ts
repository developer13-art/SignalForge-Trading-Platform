import { queues, QUEUE_NAMES } from './queue';

export const accountSyncQueue = {
  async addSync(accountId: string) {
    return queues[QUEUE_NAMES.ACCOUNT_SYNC].add('sync-account', { accountId });
  },

  async addSyncAll() {
    return queues[QUEUE_NAMES.ACCOUNT_SYNC].add('sync-all', {}, {
      repeat: { pattern: '*/1 * * * *' }, // every minute
    });
  },
};