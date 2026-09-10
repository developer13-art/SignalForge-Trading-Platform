import { apiClient } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';

export interface Signal {
  id: string;
  symbol: string | null;
  direction: string | null;
  entryType: string | null;
  entryPrice: number | null;
  stopLoss: number | null;
  takeProfit1: number | null;
  takeProfit2: number | null;
  takeProfit3: number | null;
  timeframe: string | null;
  confidence: number | null;
  status: string;
  rawText: string;
  createdAt: string;
}

export const signalService = {
  async getLive(): Promise<Signal[]> {
    const response = await apiClient.get<{ success: boolean; data: Signal[] }>(
      ENDPOINTS.SIGNALS.LIVE
    );
    return response.data;
  },

  async getHistory(): Promise<Signal[]> {
    const response = await apiClient.get<{ success: boolean; data: Signal[] }>(
      ENDPOINTS.SIGNALS.HISTORY
    );
    return response.data;
  },

  async getById(id: string): Promise<Signal> {
    const response = await apiClient.get<{ success: boolean; data: Signal }>(
      `${ENDPOINTS.SIGNALS.BASE}/${id}`
    );
    return response.data;
  },
};