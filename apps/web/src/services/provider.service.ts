import { apiClient } from '../api/client';

export interface Provider {
  id: string;
  userId: string;
  name: string;
  description?: string;
  logoUrl?: string;
  website?: string;
  isVerified: boolean;
  isActive: boolean;
  qualityScore?: number;
  rating?: number;
  subscriberCount?: number;
  monthlyReturn?: number;
  winRate?: number;
  maxDrawdown?: number;
  totalSignals?: number;
  createdAt: string;
  updatedAt: string;
}

export const providerService = {
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

  async getMyProvider(): Promise<Provider | null> {
    try {
      const response = await apiClient.get<{ success: boolean; data: Provider }>(
        '/provider-business/me'
      );
      return response.data;
    } catch {
      return null;
    }
  },

  async updateProfile(data: Partial<Provider>): Promise<Provider> {
    const response = await apiClient.patch<{ success: boolean; data: Provider }>(
      '/provider-business/profile',
      data
    );
    return response.data;
  },
};