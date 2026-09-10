import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { Spinner } from '../../components/ui/Spinner';
import { AnalyticsIcon, TrendingUpIcon } from '../../components/ui/icons';
import { analyticsService, PerformanceMetrics } from '../../services/analytics.service';

export function SharpeSortino() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    analyticsService.getPerformance().then(setMetrics).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sharpe & Sortino Ratios</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Risk-adjusted return metrics
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard label="Sharpe Ratio" value={(metrics?.sharpeRatio || 0).toFixed(2)} icon={<TrendingUpIcon size={20} className="text-primary-600" />} />
        <StatCard label="Sortino Ratio" value={(metrics?.sortinoRatio || 0).toFixed(2)} icon={<AnalyticsIcon size={20} className="text-purple-600" />} iconBg="bg-purple-100 dark:bg-purple-900/30" />
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Interpretation</h3>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <p><strong className="text-gray-900 dark:text-white">Sharpe &gt; 1:</strong> Good risk-adjusted returns</p>
          <p><strong className="text-gray-900 dark:text-white">Sharpe &gt; 2:</strong> Excellent risk-adjusted returns</p>
          <p><strong className="text-gray-900 dark:text-white">Sortino:</strong> Focuses only on downside volatility</p>
        </div>
      </Card>
    </div>
  );
}