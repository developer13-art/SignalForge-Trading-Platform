export interface Broker {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BrokerAccount {
  id: string;
  userId: string;
  brokerId: string;
  broker?: Broker;
  platform: 'MT4' | 'MT5';
  server: string;
  loginNumber: string;
  accountType: 'DEMO' | 'LIVE';
  metaapiAccountId?: string;
  nickname: string;
  status: string;
  balance: number;
  equity: number;
  margin: number;
  freeMargin: number;
  leverage?: number;
  currency?: string;
  lastSyncAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BrokerConnectRequest {
  brokerId: string;
  platform: 'MT4' | 'MT5';
  server: string;
  loginNumber: string;
  password: string;
  accountType: 'DEMO' | 'LIVE';
  nickname: string;
}

export interface AccountSnapshot {
  id: string;
  brokerAccountId: string;
  balance: number;
  equity: number;
  margin: number;
  freeMargin: number;
  openPositions: number;
  capturedAt: string;
}

export interface MetaApiPosition {
  id: string;
  symbol: string;
  type: 'POSITION_TYPE_BUY' | 'POSITION_TYPE_SELL';
  volume: number;
  openPrice: number;
  currentPrice: number;
  stopLoss?: number;
  takeProfit?: number;
  profit: number;
  swap: number;
  commission: number;
  time: string;
  comment?: string;
  magic?: number;
}