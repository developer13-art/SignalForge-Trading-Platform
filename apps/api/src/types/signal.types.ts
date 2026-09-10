export interface CreateSignalRequest {
  sourceMessageId: string;
  symbol?: string;
  direction?: string;
  entryType?: string;
  entryPrice?: number;
  stopLoss?: number;
  takeProfits?: number[];
  confidence?: number;
}

export interface SignalFilter {
  status?: string;
  symbol?: string;
  providerId?: string;
  startDate?: Date;
  endDate?: Date;
}