import { apiClient } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';

export interface PerformanceMetrics {
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  totalProfit: number;
  totalLoss: number;
  netPnL: number;
  averageWin: number;
  averageLoss: number;
  profitFactor: number;
  maxDrawdown: number;
  maxDrawdownPercent: number;
  sharpeRatio: number;
  sortinoRatio: number;
  averageRR: number;
}

export const analyticsService = {
  async getPerformance(params?: { startDate?: string; endDate?: string }): Promise<PerformanceMetrics> {
    const response = await apiClient.get<{ success: boolean; data: PerformanceMetrics }>(
      ENDPOINTS.ANALYTICS.PERFORMANCE,
      { params }
    );
    return response.data;
  },

  async getEquityCurve(days: number = 30) {
    const response = await apiClient.get<{ success: boolean; data: any[] }>(
      ENDPOINTS.ANALYTICS.EQUITY_CURVE,
      { params: { days } }
    );
    return response.data;
  },

  async getSymbolPerformance() {
    const response = await apiClient.get<{ success: boolean; data: any[] }>(
      ENDPOINTS.ANALYTICS.SYMBOLS
    );
    return response.data;
  },

  async getProviderPerformance() {
    const response = await apiClient.get<{ success: boolean; data: any[] }>(
      ENDPOINTS.ANALYTICS.OVERVIEW
    );
    return response.data;
  },

  async getTradingCalendar(year: number, month: number) {
    const response = await apiClient.get<{ success: boolean; data: any }>(
      ENDPOINTS.ANALYTICS.OVERVIEW + '/calendar',
      { params: { year, month } }
    );
    return response.data;
  },

  async getLatencyStats() {
    const response = await apiClient.get<{ success: boolean; data: any }>(
      ENDPOINTS.ANALYTICS.LATENCY
    );
    return response.data;
  },
};