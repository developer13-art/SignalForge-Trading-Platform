export interface BrokerCredentials {
  brokerId: string;
  platform: 'MT4' | 'MT5';
  server: string;
  loginNumber: string;
  password: string;
  accountType: 'DEMO' | 'LIVE';
  nickname: string;
}

export interface BrokerAccountInfo {
  balance: number;
  equity: number;
  margin: number;
  freeMargin: number;
  leverage: number;
  currency: string;
}