import { getWsServer } from './websocket.server';
import { logger } from '@signalforge/logger';

export const accountSocket = {
  async emitAccountUpdate(userId: string, account: any) {
    try {
      const ws = getWsServer();
      ws.sendToUser(userId, {
        type: 'account:update',
        data: account,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.debug('WebSocket account update failed');
    }
  },

  async emitBalanceUpdate(userId: string, balance: any) {
    try {
      const ws = getWsServer();
      ws.sendToUser(userId, {
        type: 'balance:update',
        data: balance,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.debug('WebSocket balance update failed');
    }
  },
};

export default accountSocket;