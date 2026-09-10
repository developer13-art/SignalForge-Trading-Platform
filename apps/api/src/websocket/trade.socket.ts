import { getWsServer } from './websocket.server';
import { logger } from '@signalforge/logger';

export const tradeSocket = {
  async emitTradeUpdate(userId: string, trade: any) {
    try {
      const ws = getWsServer();
      ws.sendToUser(userId, {
        type: 'trade:update',
        data: trade,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.debug('WebSocket trade update failed');
    }
  },

  async emitPositionOpened(userId: string, position: any) {
    try {
      const ws = getWsServer();
      ws.sendToUser(userId, {
        type: 'position:opened',
        data: position,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.debug('WebSocket position emit failed');
    }
  },

  async emitPositionClosed(userId: string, position: any) {
    try {
      const ws = getWsServer();
      ws.sendToUser(userId, {
        type: 'position:closed',
        data: position,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.debug('WebSocket position close failed');
    }
  },
};

export default tradeSocket;