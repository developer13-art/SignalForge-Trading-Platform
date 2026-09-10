export interface BrokerAccount {
  id: string;
  userId: string;
  brokerId: string;
  broker?: { name: string; logoUrl?: string };
  platform: string;
  server: string;
  accountType: string;
  nickname: string;
  status: string;
  balance: number;
  equity: number;
  margin: number;
  freeMargin: number;
  currency?: string;
  leverage?: number;
  lastSyncAt?: string;
  createdAt: string;
}