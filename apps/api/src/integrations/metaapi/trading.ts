import { metaApiClient } from './client';

export const metaApiTrading = {
  createMarketOrder: (id: string, data: any) => metaApiClient.createMarketOrder(id, data),
  createPendingOrder: (id: string, data: any) => metaApiClient.createPendingOrder(id, data),
  modifyPosition: (id: string, positionId: string, data: any) => metaApiClient.modifyPosition(id, positionId, data),
  closePosition: (id: string, positionId: string, volume?: number) => metaApiClient.closePosition(id, positionId, volume),
  closeBySymbol: (id: string, symbol: string) => metaApiClient.closePositionsBySymbol(id, symbol),
};

export default metaApiTrading;