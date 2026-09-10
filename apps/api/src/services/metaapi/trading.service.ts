import { metaApiClient } from '../../integrations/metaapi/client';

export class MetaApiTradingService {
  async createMarketOrder(accountId: string, data: any) {
    return metaApiClient.createMarketOrder(accountId, data);
  }

  async modifyPosition(accountId: string, positionId: string, data: any) {
    return metaApiClient.modifyPosition(accountId, positionId, data);
  }

  async closePosition(accountId: string, positionId: string, volume?: number) {
    return metaApiClient.closePosition(accountId, positionId, volume);
  }
}

export const metaApiTradingService = new MetaApiTradingService();