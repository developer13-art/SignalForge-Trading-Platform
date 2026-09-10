import { create } from 'zustand';
import { signalSourceService, SignalSource, TelegramStatus, SourceMessage } from '../services/signalSource.service';

interface SignalSourceState {
  sources: SignalSource[];
  telegramStatus: TelegramStatus | null;
  messages: SourceMessage[];
  isLoading: boolean;
  error: string | null;

  fetchSources: () => Promise<void>;
  createSource: (data: { name: string; sourceType: string; config?: Record<string, unknown> }) => Promise<void>;
  updateSource: (id: string, data: Partial<SignalSource>) => Promise<void>;
  deleteSource: (id: string) => Promise<void>;

  fetchTelegramStatus: () => Promise<void>;
  initiateTelegram: (phoneNumber: string, countryCode: string) => Promise<{ phoneCodeHash: string; message: string } | null>;
  verifyTelegram: (data: { phoneNumber: string; phoneCodeHash: string; code: string; password?: string }) => Promise<boolean>;
  disconnectTelegram: () => Promise<void>;

  fetchMessages: (sourceId?: string) => Promise<void>;
}

export const useSignalSourceStore = create<SignalSourceState>((set, get) => ({
  sources: [],
  telegramStatus: null,
  messages: [],
  isLoading: false,
  error: null,

  fetchSources: async () => {
    set({ isLoading: true, error: null });
    try {
      const sources = await signalSourceService.getSources();
      set({ sources, isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to fetch sources', isLoading: false });
    }
  },

  createSource: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await signalSourceService.createSource(data);
      await get().fetchSources();
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to create source', isLoading: false });
      throw error;
    }
  },

  updateSource: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      await signalSourceService.updateSource(id, data);
      await get().fetchSources();
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to update source', isLoading: false });
    }
  },

  deleteSource: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await signalSourceService.deleteSource(id);
      await get().fetchSources();
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to delete source', isLoading: false });
    }
  },

  fetchTelegramStatus: async () => {
    try {
      const status = await signalSourceService.getTelegramStatus();
      set({ telegramStatus: status });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to fetch Telegram status' });
    }
  },

  initiateTelegram: async (phoneNumber, countryCode) => {
    set({ isLoading: true, error: null });
    try {
      const result = await signalSourceService.initiateTelegramConnection(phoneNumber, countryCode);
      set({ isLoading: false });
      return result;
    } catch (error: any) {
      set({ error: error?.message || 'Failed to initiate Telegram connection', isLoading: false });
      return null;
    }
  },

  verifyTelegram: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await signalSourceService.verifyTelegramConnection(data);
      await get().fetchTelegramStatus();
      set({ isLoading: false });
      return true;
    } catch (error: any) {
      set({ error: error?.message || 'Invalid verification code', isLoading: false });
      return false;
    }
  },

  disconnectTelegram: async () => {
    set({ isLoading: true, error: null });
    try {
      await signalSourceService.disconnectTelegram();
      await get().fetchTelegramStatus();
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to disconnect Telegram', isLoading: false });
    }
  },

  fetchMessages: async (sourceId) => {
    set({ isLoading: true, error: null });
    try {
      const messages = await signalSourceService.getMessages(sourceId);
      set({ messages, isLoading: false });
    } catch (error: any) {
      set({ error: error?.message || 'Failed to fetch messages', isLoading: false });
    }
  },
}));