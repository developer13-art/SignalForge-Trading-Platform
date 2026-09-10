import { useEffect, useState } from 'react';
import { referralService, ReferralDashboard } from '../services/referral.service';

export function useReferral() {
  const [data, setData] = useState<ReferralDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    referralService.getDashboard().then(setData).catch(() => {}).finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, refetch: () => referralService.getDashboard().then(setData) };
}