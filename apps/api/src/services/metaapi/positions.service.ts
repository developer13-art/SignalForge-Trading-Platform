import { metaApiClient } from '../../integrations/metaapi/client';

export class PositionsService {
  async getPositions(accountId: string) {
    return metaApiClient.getPositions(accountId);
  }
}

export const positionsService = new PositionsService();