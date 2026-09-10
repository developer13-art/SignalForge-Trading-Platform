import { logger } from '@signalforge/logger';

export class MetaApiStreamingClient {
  private connections: Map<string, any> = new Map();

  async subscribe(accountId: string, apiToken: string, handlers: {
    onPosition?: (position: any) => void;
    onOrder?: (order: any) => void;
    onAccount?: (account: any) => void;
  }): Promise<void> {
    logger.info(`MetaApi stream subscribed for ${accountId}`);
    this.connections.set(accountId, handlers);
  }

  async unsubscribe(accountId: string): Promise<void> {
    this.connections.delete(accountId);
    logger.info(`MetaApi stream unsubscribed for ${accountId}`);
  }

  getHandlers(accountId: string) {
    return this.connections.get(accountId);
  }
}

export const metaApiStreamingClient = new MetaApiStreamingClient();
export default metaApiStreamingClient;