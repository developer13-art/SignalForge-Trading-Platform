export interface SubscriptionPlan {
  id: string;
  name: string;
  description?: string;
  price: number;
  period: 'MONTHLY' | 'YEARLY' | 'LIFETIME' | 'ENTERPRISE';
  features?: Record<string, unknown>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  plan?: SubscriptionPlan;
  status: string;
  startDate: string;
  endDate?: string;
  autoRenew: boolean;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  subscriptionId: string;
  userId: string;
  amount: number;
  currency: string;
  status: string;
  provider: 'PAYSTACK' | 'STRIPE';
  providerRef?: string;
  metadata?: Record<string, unknown>;
  paidAt?: string;
  createdAt: string;
}

export interface SubscribeRequest {
  planId: string;
  paymentProvider?: 'PAYSTACK' | 'STRIPE';
}

export interface PaymentWebhookPayload {
  event: string;
  data: {
    id: string;
    reference: string;
    amount: number;
    currency: string;
    status: string;
    customer?: {
      email?: string;
    };
    metadata?: Record<string, unknown>;
    paid_at?: string;
  };
}

export interface PaystackInitializeResponse {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface SubscriptionInfo {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  status: string;
  startDate: string;
  endDate?: string;
  autoRenew: boolean;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  price: number;
  period: string;
}