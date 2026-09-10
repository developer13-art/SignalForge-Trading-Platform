export interface SubscriptionPlan {
  id: string;
  name: string;
  description?: string;
  price: number;
  period: string;
  features?: Record<string, unknown>;
  isActive: boolean;
}

export interface Payment {
  id: string;
  subscriptionId: string;
  userId: string;
  amount: number;
  currency: string;
  status: string;
  provider: string;
  providerRef?: string;
  paidAt?: string;
  createdAt: string;
}