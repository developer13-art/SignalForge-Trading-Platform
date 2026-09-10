import { getWsServer } from './websocket.server';
import { logger } from '@signalforge/logger';

export const notificationSocket = {
  async emitNotification(userId: string, notification: any) {
    try {
      const ws = getWsServer();
      ws.sendToUser(userId, {
        type: 'notification:new',
        data: notification,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.debug('WebSocket notification emit failed');
    }
  },
};

export default notificationSocket;