export interface CreateSignalSourceRequest {
  name: string;
  sourceType: 'TELEGRAM' | 'DISCORD' | 'WHATSAPP' | 'TRADINGVIEW' | 'REST_API' | 'EMAIL';
  config?: Record<string, unknown>;
}

export interface UpdateSignalSourceRequest {
  name?: string;
  isActive?: boolean;
  config?: Record<string, unknown>;
}

export interface SignalSourceResponse {
  id: string;
  userId: string;
  sourceType: string;
  name: string;
  isActive: boolean;
  config?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}