import { getWsServer } from './websocket.server';
import { logger } from '@signalforge/logger';

export const signalSocket = {
  async emitNewSignal(userId: string, signal: any) {
    try {
      const ws = getWsServer();
      ws.sendToUser(userId, {
        type: 'signal:new',
        data: signal,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.debug('WebSocket signal emit failed');
    }
  },

  async emitSignalUpdate(userId: string, signal: any) {
    try {
      const ws = getWsServer();
      ws.sendToUser(userId, {
        type: 'signal:update',
        data: signal,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.debug('WebSocket signal update failed');
    }
  },
};

export default signalSocket;