import { create } from 'zustand';
import { analyticsService, PerformanceMetrics } from '../services/analytics.service';

interface AnalyticsState {
  metrics: PerformanceMetrics | null;
  equityCurve: any[];
  symbolPerformance: any[];
  isLoading: boolean;
  error: string | null;
  fetchPerformance: (params?: { startDate?: string; endDate?: string }) => Promise<void>;
  fetchEquityCurve: (days?: number) => Promise<void>;
  fetchSymbolPerformance: () => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  metrics: null,
  equityCurve: [],
  symbolPerformance: [],
  isLoading: false,
  error: null,

  fetchPerformance: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const metrics = await analyticsService.getPerformance(params);
      set({ metrics, isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to load performance', isLoading: false });
    }
  },

  fetchEquityCurve: async (days = 30) => {
    try {
      const equityCurve = await analyticsService.getEquityCurve(days);
      set({ equityCurve });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to load equity curve' });
    }
  },

  fetchSymbolPerformance: async () => {
    try {
      const symbolPerformance = await analyticsService.getSymbolPerformance();
      set({ symbolPerformance });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to load symbol performance' });
    }
  },
}));