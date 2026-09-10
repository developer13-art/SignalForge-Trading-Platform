import { metaApiClient } from '../../integrations/metaapi/client';

export class MetaApiService {
  getClient() {
    return metaApiClient;
  }
}

export const metaApiService = new MetaApiService();