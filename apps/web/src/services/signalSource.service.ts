import { apiClient } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';

export interface SignalSource {
  id: string;
  userId: string;
  sourceType: string;
  name: string;
  isActive: boolean;
  config?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface TelegramStatus {
  isConnected: boolean;
  phoneNumber: string | null;
  lastConnectedAt?: string;
  channelsCount: number;
}

export interface SourceMessage {
  id: string;
  externalMessageId: string;
  senderName?: string;
  messageText: string;
  processingStatus: string;
  receivedAt: string;
  signals?: Array<{
    id: string;
    status: string;
    symbol?: string;
    direction?: string;
    confidence?: number;
  }>;
}

export const signalSourceService = {
  async createSource(data: { name: string; sourceType: string; config?: Record<string, unknown> }): Promise<SignalSource> {
    const response = await apiClient.post<{ success: boolean; data: SignalSource }>(
      ENDPOINTS.SIGNAL_SOURCES.BASE,
      data
    );
    return response.data;
  },

  async getSources(): Promise<SignalSource[]> {
    const response = await apiClient.get<{ success: boolean; data: SignalSource[] }>(
      ENDPOINTS.SIGNAL_SOURCES.BASE
    );
    return response.data;
  },

  async getSource(id: string): Promise<SignalSource> {
    const response = await apiClient.get<{ success: boolean; data: SignalSource }>(
      `${ENDPOINTS.SIGNAL_SOURCES.BASE}/${id}`
    );
    return response.data;
  },

  async updateSource(id: string, data: Partial<SignalSource>): Promise<SignalSource> {
    const response = await apiClient.patch<{ success: boolean; data: SignalSource }>(
      `${ENDPOINTS.SIGNAL_SOURCES.BASE}/${id}`,
      data
    );
    return response.data;
  },

  async deleteSource(id: string): Promise<void> {
    await apiClient.delete(`${ENDPOINTS.SIGNAL_SOURCES.BASE}/${id}`);
  },

  // Telegram
  async initiateTelegramConnection(phoneNumber: string, countryCode: string): Promise<{ phoneCodeHash: string; message: string }> {
    const response = await apiClient.post<{ success: boolean; data: { phoneCodeHash: string; message: string } }>(
      ENDPOINTS.SIGNAL_SOURCES.TELEGRAM_CONNECT,
      { phoneNumber, countryCode }
    );
    return response.data;
  },

  async verifyTelegramConnection(data: { phoneNumber: string; phoneCodeHash: string; code: string; password?: string }): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post<{ success: boolean; data: { success: boolean; message: string } }>(
      ENDPOINTS.SIGNAL_SOURCES.TELEGRAM_CONNECT + '/verify',
      data
    );
    return response.data;
  },

  async getTelegramStatus(): Promise<TelegramStatus> {
    const response = await apiClient.get<{ success: boolean; data: TelegramStatus }>(
      ENDPOINTS.SIGNAL_SOURCES.TELEGRAM_CONNECT + '/status'
    );
    return response.data;
  },

  async getTelegramChannels(): Promise<Array<{ id: string; name: string; type: string }>> {
    const response = await apiClient.get<{ success: boolean; data: Array<{ id: string; name: string; type: string }> }>(
      ENDPOINTS.SIGNAL_SOURCES.TELEGRAM_CHANNELS
    );
    return response.data;
  },

  async selectTelegramChannel(channelId: string, isMonitored: boolean): Promise<void> {
    await apiClient.post(ENDPOINTS.SIGNAL_SOURCES.TELEGRAM_SELECT_CHANNEL, {
      channelId,
      isMonitored,
    });
  },

  async disconnectTelegram(): Promise<void> {
    await apiClient.post(ENDPOINTS.SIGNAL_SOURCES.TELEGRAM_CONNECT + '/disconnect');
  },

  async getMessages(sourceId?: string, limit?: number): Promise<SourceMessage[]> {
    const params = new URLSearchParams();
    if (sourceId) params.append('sourceId', sourceId);
    if (limit) params.append('limit', limit.toString());

    const response = await apiClient.get<{ success: boolean; data: SourceMessage[] }>(
      `${ENDPOINTS.SIGNAL_SOURCES.MESSAGES}/all?${params.toString()}`
    );
    return response.data;
  },
};