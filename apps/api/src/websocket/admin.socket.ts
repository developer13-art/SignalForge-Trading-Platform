import { getWsServer } from './websocket.server';
import { logger } from '@signalforge/logger';

export const adminSocket = {
  async broadcastSystemEvent(event: any) {
    try {
      const ws = getWsServer();
      ws.broadcast({
        type: 'admin:event',
        data: event,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.debug('WebSocket admin broadcast failed');
    }
  },
};

export default adminSocket;