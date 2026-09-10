import { apiClient } from '../api/client';

export interface DashboardOverview {
  openTrades: number;
  recentSignals: number;
  activeSubscriptions: number;
  balance?: number;
  equity?: number;
  netPnL?: number;
  winRate?: number;
}

export interface RecentTrade {
  id: string;
  symbol: string;
  direction: string;
  volume: number;
  realizedProfit: number;
  status: string;
  createdAt: string;
}

export const dashboardService = {
  async getOverview(): Promise<DashboardOverview> {
    try {
      const response = await apiClient.get<{ success: boolean; data: DashboardOverview }>(
        '/dashboard/overview'
      );
      return response.data;
    } catch {
      return { openTrades: 0, recentSignals: 0, activeSubscriptions: 0 };
    }
  },

  async getRecentTrades(): Promise<RecentTrade[]> {
    try {
      const response = await apiClient.get<{ success: boolean; data: RecentTrade[] }>(
        '/dashboard/recent-trades'
      );
      return response.data;
    } catch {
      return [];
    }
  },

  async getActiveSignals() {
    try {
      const response = await apiClient.get<{ success: boolean; data: any[] }>(
        '/dashboard/active-signals'
      );
      return response.data;
    } catch {
      return [];
    }
  },
};