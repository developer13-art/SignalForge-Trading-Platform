import { useEffect } from 'react';
import { useKycStore } from '../stores/kyc.store';

export function useKyc() {
  const store = useKycStore();

  useEffect(() => {
    if (!store.status) {
      store.fetchStatus();
    }
  }, []);

  return {
    status: store.status,
    isLoading: store.isLoading,
    error: store.error,
    refetch: store.fetchStatus,
    startApplication: store.startApplication,
    submitPersonalInfo: store.submitPersonalInfo,
    submitForReview: store.submitForReview,
  };
}