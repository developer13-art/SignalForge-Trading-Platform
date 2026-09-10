import { useEffect, useState } from 'react';
import { analyticsService, PerformanceMetrics } from '../services/analytics.service';

export function useAnalytics() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    analyticsService.getPerformance().then(setMetrics).catch(() => {}).finally(() => setIsLoading(false));
  }, []);

  return { metrics, isLoading };
}