export interface Provider {
  id: string;
  userId: string;
  name: string;
  description?: string;
  logoUrl?: string;
  website?: string;
  isVerified: boolean;
  isActive: boolean;
  qualityScore?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProviderCertification {
  id: string;
  providerId: string;
  status: string;
  score?: number;
  certificationDate?: string;
  expiryDate?: string;
  reportData?: Record<string, unknown>;
  createdAt: string;
}

export interface ProviderSubscription {
  id: string;
  userId: string;
  providerId: string;
  accountId?: string;
  riskProfileId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProviderDna {
  id: string;
  providerId: string;
  language?: string;
  symbols: string[];
  abbreviations?: Record<string, string>;
  patterns?: Record<string, unknown>;
  riskStyle?: Record<string, unknown>;
  confidence?: number;
  version: number;
  lastUpdated: string;
}

export interface ProviderDnaRule {
  id: string;
  providerDnaId: string;
  pattern: string;
  action: string;
  priority: number;
  isActive: boolean;
  createdAt: string;
}

export interface ProviderDnaProfile {
  providerId: string;
  language: string;
  symbols: string[];
  abbreviations: Record<string, string>;
  patterns: Array<{
    pattern: string;
    meaning: string;
    action: string;
  }>;
  riskStyle: Record<string, unknown>;
  confidence: number;
  version: number;
}