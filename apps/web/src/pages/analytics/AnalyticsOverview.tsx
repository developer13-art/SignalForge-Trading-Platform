import React, { useEffect, useState } from 'react';
import { analyticsService, PerformanceMetrics } from '../../services/analytics.service';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import {
  AnalyticsIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  DollarIcon,
} from '../../components/ui/icons';

export function AnalyticsOverview() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    analyticsService.getPerformance()
      .then(setMetrics)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;
  }

  if (!metrics) {
    return (
      <Card>
        <div className="text-center py-12">
          <AnalyticsIcon size={48} className="text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No performance data available</p>
        </div>
      </Card>
    );
  }

  const stats = [
    { label: 'Total Trades', value: metrics.totalTrades, icon: AnalyticsIcon },
    { label: 'Win Rate', value: `${metrics.winRate.toFixed(1)}%`, icon: TrendingUpIcon },
    { label: 'Net P&L', value: `$${metrics.netPnL.toFixed(2)}`, icon: DollarIcon, positive: metrics.netPnL >= 0 },
    { label: 'Profit Factor', value: metrics.profitFactor.toFixed(2), icon: TrendingUpIcon },
    { label: 'Avg Win', value: `$${metrics.averageWin.toFixed(2)}`, icon: TrendingUpIcon },
    { label: 'Avg Loss', value: `$${metrics.averageLoss.toFixed(2)}`, icon: TrendingDownIcon },
    { label: 'Max Drawdown', value: `${metrics.maxDrawdownPercent.toFixed(1)}%`, icon: TrendingDownIcon },
    { label: 'Sharpe Ratio', value: metrics.sharpeRatio.toFixed(2), icon: TrendingUpIcon },
    { label: 'Sortino Ratio', value: metrics.sortinoRatio.toFixed(2), icon: TrendingUpIcon },
    { label: 'Avg RR', value: metrics.averageRR.toFixed(2), icon: TrendingUpIcon },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Track your trading performance and metrics
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  <p className={`text-xl font-bold mt-1 ${
                    stat.positive !== undefined
                      ? stat.positive ? 'text-green-600' : 'text-red-600'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {stat.value}
                  </p>
                </div>
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                  <Icon size={16} className="text-primary-600 dark:text-primary-400" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Section - Placeholder for equity curve */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Equity Curve</h3>
        <div className="h-64 flex items-center justify-center text-gray-400">
          Equity curve visualization will appear here
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Symbol Performance</h3>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
            No symbol data available yet
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Provider Performance</h3>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
            No provider data available yet
          </div>
        </Card>
      </div>
    </div>
  );
}