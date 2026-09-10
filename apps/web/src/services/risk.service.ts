import { apiClient } from '../api/client';

export interface RiskProfile {
  id: string;
  userId: string;
  riskPercent: number;
  maxDailyLoss: number;
  maxDrawdown: number;
  maxOpenTrades: number;
  tradingSessions?: any[];
  trailingStop: boolean;
  breakEven: boolean;
  profitLock: boolean;
  partialClose: boolean;
  correlationProtection: boolean;
  newsFilter: boolean;
  emergencyStop: boolean;
}

export const riskService = {
  async getProfile(): Promise<RiskProfile | null> {
    try {
      const response = await apiClient.get<{ success: boolean; data: RiskProfile }>('/risk/profile');
      return response.data;
    } catch {
      return null;
    }
  },

  async updateProfile(data: Partial<RiskProfile>): Promise<void> {
    await apiClient.patch('/risk/profile', data);
  },

  async getRules(): Promise<any[]> {
    try {
      const response = await apiClient.get<{ success: boolean; data: any[] }>('/risk/rules');
      return response.data;
    } catch {
      return [];
    }
  },

  async createRule(data: any): Promise<void> {
    await apiClient.post('/risk/rules', data);
  },

  async updateRule(id: string, data: any): Promise<void> {
    await apiClient.patch(`/risk/rules/${id}`, data);
  },

  async deleteRule(id: string): Promise<void> {
    await apiClient.delete(`/risk/rules/${id}`);
  },
};