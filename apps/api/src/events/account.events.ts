import { eventBus } from './event-bus';

export const accountEvents = {
  async accountConnected(data: { accountId: string; userId: string }) {
    await eventBus.publish('TradeExecuted', data, { userId: data.userId });
  },

  async accountSynced(data: { accountId: string; userId: string }) {
    await eventBus.publishToUser(data.userId, 'account:synced', data);
  },

  async accountDisconnected(data: { accountId: string; userId: string }) {
    await eventBus.publishToUser(data.userId, 'account:disconnected', data);
  },
};

export default accountEvents;