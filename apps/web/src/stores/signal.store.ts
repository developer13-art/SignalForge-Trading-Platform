import { create } from 'zustand';
import { signalService, Signal } from '../services/signal.service';

interface SignalState {
  signals: Signal[];
  currentSignal: Signal | null;
  isLoading: boolean;
  error: string | null;
  fetchLive: () => Promise<void>;
  fetchHistory: () => Promise<void>;
  fetchById: (id: string) => Promise<void>;
  addSignal: (signal: Signal) => void;
  reset: () => void;
}

export const useSignalStore = create<SignalState>((set) => ({
  signals: [],
  currentSignal: null,
  isLoading: false,
  error: null,

  fetchLive: async () => {
    set({ isLoading: true, error: null });
    try {
      const signals = await signalService.getLive();
      set({ signals, isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to load signals', isLoading: false });
    }
  },

  fetchHistory: async () => {
    set({ isLoading: true, error: null });
    try {
      const signals = await signalService.getHistory();
      set({ signals, isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to load history', isLoading: false });
    }
  },

  fetchById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const signal = await signalService.getById(id);
      set({ currentSignal: signal, isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to load signal', isLoading: false });
    }
  },

  addSignal: (signal) => set((state) => ({ signals: [signal, ...state.signals].slice(0, 100) })),

  reset: () => set({ signals: [], currentSignal: null, error: null }),
}));