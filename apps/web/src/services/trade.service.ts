import { apiClient } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';

export interface Trade {
  id: string;
  symbol: string;
  direction: 'BUY' | 'SELL';
  volume: number;
  entryPrice?: number;
  exitPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  realizedProfit: number;
  status: string;
  openedAt?: string;
  closedAt?: string;
  createdAt: string;
  events?: any[];
}

export const tradeService = {
  async getHistory(): Promise<Trade[]> {
    const response = await apiClient.get<{ success: boolean; data: any }>(
      ENDPOINTS.TRADING.TRADES
    );
    return response.data?.data || response.data || [];
  },

  async getOpenPositions(): Promise<Trade[]> {
    const response = await apiClient.get<{ success: boolean; data: Trade[] }>(
      ENDPOINTS.TRADING.OPEN_POSITIONS
    );
    return response.data;
  },

  async getById(id: string): Promise<Trade> {
    const response = await apiClient.get<{ success: boolean; data: Trade }>(
      `${ENDPOINTS.TRADING.TRADES}/${id}`
    );
    return response.data;
  },

  async getRecent(): Promise<Trade[]> {
    const response = await apiClient.get<{ success: boolean; data: Trade[] }>(
      ENDPOINTS.DASHBOARD.RECENT_TRADES
    );
    return response.data;
  },

  async close(id: string, volume?: number): Promise<void> {
    await apiClient.post(`${ENDPOINTS.TRADING.TRADES}/${id}/close`, { volume });
  },

  async modify(id: string, data: { stopLoss?: number; takeProfit?: number }): Promise<void> {
    await apiClient.patch(`${ENDPOINTS.TRADING.TRADES}/${id}`, data);
  },

  async moveToBreakEven(id: string): Promise<void> {
    await apiClient.post(`${ENDPOINTS.TRADING.TRADES}/${id}/break-even`);
  },
};