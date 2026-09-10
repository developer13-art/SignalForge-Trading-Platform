import { apiClient } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';

export interface BrokerAccount {
  id: string;
  brokerId: string;
  broker?: { name: string; logoUrl?: string };
  platform: string;
  server: string;
  accountType: string;
  nickname: string;
  status: string;
  balance: number;
  equity: number;
  margin: number;
  freeMargin: number;
  currency?: string;
  lastSyncAt?: string;
}

export const brokerService = {
  async getBrokers() {
    const response = await apiClient.get<{ success: boolean; data: any[] }>(
      ENDPOINTS.BROKERS.BASE
    );
    return response.data;
  },

  async getAccounts(): Promise<BrokerAccount[]> {
    const response = await apiClient.get<{ success: boolean; data: BrokerAccount[] }>(
      ENDPOINTS.BROKERS.ACCOUNTS
    );
    return response.data;
  },

  async connect(data: {
    brokerId: string;
    platform: string;
    server: string;
    loginNumber: string;
    password: string;
    accountType: string;
    nickname: string;
  }): Promise<BrokerAccount> {
    const response = await apiClient.post<{ success: boolean; data: BrokerAccount }>(
      ENDPOINTS.BROKERS.CONNECT,
      data
    );
    return response.data;
  },

  async disconnect(accountId: string) {
    const response = await apiClient.post(
      `${ENDPOINTS.BROKERS.ACCOUNTS}/${accountId}/disconnect`
    );
    return response.data;
  },

  async sync(accountId: string) {
    const response = await apiClient.post(
      `${ENDPOINTS.BROKERS.ACCOUNTS}/${accountId}/sync`
    );
    return response.data;
  },
};