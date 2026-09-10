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
  rating?: number;
  subscriberCount?: number;
  monthlyReturn?: number;
  winRate?: number;
  maxDrawdown?: number;
  totalSignals?: number;
  createdAt: string;
  updatedAt: string;
}