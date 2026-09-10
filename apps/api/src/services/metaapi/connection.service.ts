import { metaApiClient } from '../../integrations/metaapi/client';
import { streamingService } from './streaming.service';
import { logger } from '@signalforge/logger';

export class ConnectionService {
  async testConnection(accountId: string): Promise<boolean> {
    try {
      await metaApiClient.getAccount(accountId);
      return true;
    } catch {
      return false;
    }
  }

  async ensureStreaming(accountId: string, apiToken: string) {
    if (!streamingService.isConnected(accountId)) {
      await streamingService.connect(accountId, apiToken);
    }
  }
}

export const connectionService = new ConnectionService();