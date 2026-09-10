import { metaApiClient } from '../../integrations/metaapi/client';

export class OrdersService {
  async getOrders(accountId: string) {
    return metaApiClient.getOrders(accountId);
  }

  async createPendingOrder(accountId: string, data: any) {
    return metaApiClient.createPendingOrder(accountId, data);
  }
}

export const ordersService = new OrdersService();