import { apiClient } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';

export interface SubscriptionPlan {
  id: string;
  name: string;
  description?: string;
  price: number;
  period: string;
  features?: Record<string, unknown>;
  isActive: boolean;
}

export interface SubscriptionInfo {
  hasActiveSubscription: boolean;
  subscription: {
    id: string;
    planId: string;
    planName: string;
    status: string;
    startDate: string;
    endDate?: string;
    currentPeriodEnd: string;
    autoRenew: boolean;
  } | null;
}

export const subscriptionService = {
  async getPlans(): Promise<SubscriptionPlan[]> {
    const response = await apiClient.get<{ success: boolean; data: SubscriptionPlan[] }>(
      ENDPOINTS.SUBSCRIPTIONS.PLANS
    );
    return response.data;
  },

  async getCurrentSubscription(): Promise<SubscriptionInfo> {
    const response = await apiClient.get<{ success: boolean; data: SubscriptionInfo }>(
      ENDPOINTS.SUBSCRIPTIONS.CURRENT
    );
    return response.data;
  },

  async subscribe(planId: string): Promise<{ authorizationUrl: string; accessCode: string; reference: string }> {
    const response = await apiClient.post<{ success: boolean; data: { authorizationUrl: string; accessCode: string; reference: string } }>(
      ENDPOINTS.SUBSCRIPTIONS.SUBSCRIBE,
      { planId }
    );
    return response.data;
  },

  async cancelSubscription(reason?: string): Promise<void> {
    await apiClient.post(ENDPOINTS.SUBSCRIPTIONS.CANCEL, { reason });
  },

  async verifyPayment(reference: string): Promise<{ handled: boolean; subscriptionId?: string }> {
    const response = await apiClient.post<{ success: boolean; data: { handled: boolean; subscriptionId?: string } }>(
      ENDPOINTS.SUBSCRIPTIONS.SUBSCRIBE + '/verify',
      { reference }
    );
    return response.data;
  },
};