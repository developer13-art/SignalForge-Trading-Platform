import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { Spinner } from '../../components/ui/Spinner';
import { TrendingUpIcon, TrendingDownIcon, AnalyticsIcon } from '../../components/ui/icons';
import { analyticsService, PerformanceMetrics } from '../../services/analytics.service';

export function RiskRewardAnalysis() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    analyticsService.getPerformance().then(setMetrics).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Risk / Reward Analysis</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Average win vs average loss ratio
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Avg Win" value={`$${(metrics?.averageWin || 0).toFixed(2)}`} icon={<TrendingUpIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Avg Loss" value={`$${(metrics?.averageLoss || 0).toFixed(2)}`} icon={<TrendingDownIcon size={20} className="text-red-600" />} iconBg="bg-red-100 dark:bg-red-900/30" />
        <StatCard label="Avg R:R" value={(metrics?.averageRR || 0).toFixed(2)} icon={<AnalyticsIcon size={20} className="text-primary-600" />} />
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ratio Analysis</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          A ratio above 1.0 means your average win is larger than your average loss.
        </p>
      </Card>
    </div>
  );
}