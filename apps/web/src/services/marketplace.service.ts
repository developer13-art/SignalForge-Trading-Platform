import { apiClient } from '../api/client';

export interface Provider {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  isVerified: boolean;
  rating?: number;
  subscriberCount?: number;
  monthlyReturn?: number;
  winRate?: number;
  maxDrawdown?: number;
  totalSignals?: number;
}

export interface Trader {
  id: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  style?: string;
  isCopying?: boolean;
  rating?: number;
  followerCount?: number;
  monthlyReturn?: number;
  winRate?: number;
  totalTrades?: number;
}

export const marketplaceService = {
  async getProviders(): Promise<Provider[]> {
    const response = await apiClient.get<{ success: boolean; data: Provider[] }>(
      '/provider-marketplace/providers'
    );
    return response.data;
  },

  async getProvider(id: string): Promise<Provider> {
    const response = await apiClient.get<{ success: boolean; data: Provider }>(
      `/provider-marketplace/providers/${id}`
    );
    return response.data;
  },

  async subscribe(providerId: string, planId: string): Promise<void> {
    await apiClient.post(`/provider-marketplace/providers/${providerId}/subscribe`, { planId });
  },

  async getMyProviders(): Promise<Provider[]> {
    try {
      const response = await apiClient.get<{ success: boolean; data: Provider[] }>(
        '/provider-marketplace/my-providers'
      );
      return response.data;
    } catch {
      return [];
    }
  },

  async getTraders(): Promise<Trader[]> {
    const response = await apiClient.get<{ success: boolean; data: Trader[] }>(
      '/trader-marketplace/traders'
    );
    return response.data;
  },

  async getTrader(id: string): Promise<Trader> {
    const response = await apiClient.get<{ success: boolean; data: Trader }>(
      `/trader-marketplace/traders/${id}`
    );
    return response.data;
  },

  async followTrader(traderId: string): Promise<void> {
    await apiClient.post(`/trader-marketplace/traders/${traderId}/follow`);
  },

  async getMyFollowedTraders(): Promise<Trader[]> {
    try {
      const response = await apiClient.get<{ success: boolean; data: Trader[] }>(
        '/trader-marketplace/my-followed'
      );
      return response.data;
    } catch {
      return [];
    }
  },
};