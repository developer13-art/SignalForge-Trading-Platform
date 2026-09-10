import { useEffect } from 'react';
import { useSubscriptionStore } from '../stores/subscription.store';

export function useSubscription() {
  const store = useSubscriptionStore();

  useEffect(() => {
    if (!store.plans.length) {
      store.fetchPlans();
    }
    if (!store.currentSubscription) {
      store.fetchCurrentSubscription();
    }
  }, []);

  return {
    plans: store.plans,
    subscription: store.currentSubscription,
    isLoading: store.isLoading,
    subscribe: store.subscribe,
    cancelSubscription: store.cancelSubscription,
    refetch: store.fetchCurrentSubscription,
  };
}