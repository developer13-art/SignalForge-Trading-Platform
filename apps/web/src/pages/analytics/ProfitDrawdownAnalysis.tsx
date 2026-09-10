import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { Spinner } from '../../components/ui/Spinner';
import { DollarIcon, TrendingDownIcon, TrendingUpIcon, AnalyticsIcon } from '../../components/ui/icons';
import { analyticsService, PerformanceMetrics } from '../../services/analytics.service';

export function ProfitDrawdownAnalysis() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    analyticsService.getPerformance().then(setMetrics).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profit & Drawdown Analysis</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Deep dive into profitability and drawdown patterns
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total P&L" value={`$${(metrics?.netPnL || 0).toFixed(2)}`} icon={<DollarIcon size={20} className="text-primary-600" />} />
        <StatCard label="Total Profit" value={`$${(metrics?.totalProfit || 0).toFixed(2)}`} icon={<TrendingUpIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Total Loss" value={`$${(metrics?.totalLoss || 0).toFixed(2)}`} icon={<TrendingDownIcon size={20} className="text-red-600" />} iconBg="bg-red-100 dark:bg-red-900/30" />
        <StatCard label="Max Drawdown" value={`${(metrics?.maxDrawdownPercent || 0).toFixed(1)}%`} icon={<AnalyticsIcon size={20} className="text-yellow-600" />} iconBg="bg-yellow-100 dark:bg-yellow-900/30" />
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profit Distribution</h3>
        <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
          Chart will appear once trades are executed
        </div>
      </Card>
    </div>
  );
}