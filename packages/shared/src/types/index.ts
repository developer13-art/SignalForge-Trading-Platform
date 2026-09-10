// packages/shared/src/types/index.ts
import {
  KycStatus,
  SignalClassification,
  SignalDirection,
  EntryType,
  SignalStatus,
  TradeStatus,
  BrokerPlatform,
  BrokerAccountType,
  SubscriptionStatus,
} from '../enums';

export interface StandardizedSignal {
  id: string;
  providerId: string;
  sourceMessageId: string;
  symbol: string;
  direction: SignalDirection;
  entryType: EntryType;
  entryPrice?: number;
  stopLoss?: number;
  takeProfit1?: number;
  takeProfit2?: number;
  takeProfit3?: number;
  timeframe?: string;
  confidence: number;
  classification: SignalClassification;
  status: SignalStatus;
  rawText: string;
  parsedAt: Date;
  expiresAt?: Date;
  metadata?: Record<string, unknown>;
}

export interface TradeExecutionRequest {
  signalId: string;
  userId: string;
  brokerAccountId: string;
  symbol: string;
  direction: SignalDirection;
  volume: number;
  entryPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  comment?: string;
  magicNumber?: number;
}

export interface RiskCheckResult {
  passed: boolean;
  checks: RiskCheck[];
  overallScore: number;
  reasons?: string[];
}

export interface RiskCheck {
  name: string;
  passed: boolean;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  value?: number;
  limit?: number;
}

export interface UserKycInfo {
  userId: string;
  status: KycStatus;
  verifiedAt?: Date;
  expiresAt?: Date;
}

export interface BrokerAccount {
  id: string;
  userId: string;
  broker: string;
  platform: BrokerPlatform;
  server: string;
  loginNumber: string;
  accountType: BrokerAccountType;
  metaapiAccountId?: string;
  nickname: string;
  status: string;
  balance: number;
  equity: number;
  margin: number;
  freeMargin: number;
  leverage?: number;
  currency?: string;
}

export interface SubscriptionInfo {
  id: string;
  userId: string;
  planId: string;
  status: SubscriptionStatus;
  startDate: Date;
  endDate?: Date;
  autoRenew: boolean;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
}