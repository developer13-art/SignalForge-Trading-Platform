export interface ProviderData {
  userId: string;
  name: string;
  description?: string;
  logoUrl?: string;
  website?: string;
}

export interface ProviderDnaData {
  language: string;
  symbols: string[];
  abbreviations: Record<string, string>;
  patterns: Array<{ pattern: string; action: string }>;
  riskStyle: Record<string, unknown>;
  confidence: number;
}