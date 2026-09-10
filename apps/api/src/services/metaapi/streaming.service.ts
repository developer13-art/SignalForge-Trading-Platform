import { logger } from '@signalforge/logger';

export class StreamingService {
  private connections: Map<string, any> = new Map();

  async connect(accountId: string, apiToken: string) {
    logger.info(`Starting stream for account ${accountId}`);
    this.connections.set(accountId, { status: 'connected' });
  }

  async disconnect(accountId: string) {
    this.connections.delete(accountId);
    logger.info(`Stream disconnected for account ${accountId}`);
  }

  isConnected(accountId: string): boolean {
    return this.connections.has(accountId);
  }
}

export const streamingService = new StreamingService();