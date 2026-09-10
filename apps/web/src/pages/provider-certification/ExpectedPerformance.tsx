import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { TrendingUpIcon, AnalyticsIcon, RiskIcon, DollarIcon } from '../../components/ui/icons';

export function ExpectedPerformance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Expected Performance</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Predicted performance based on historical data
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Expected Win Rate" value="0%" icon={<TrendingUpIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Expected Return" value="0%" icon={<DollarIcon size={20} className="text-primary-600" />} />
        <StatCard label="Expected Drawdown" value="0%" icon={<RiskIcon size={20} className="text-red-600" />} iconBg="bg-red-100 dark:bg-red-900/30" />
        <StatCard label="Risk Score" value="0" icon={<AnalyticsIcon size={20} className="text-purple-600" />} iconBg="bg-purple-100 dark:bg-purple-900/30" />
      </div>
    </div>
  );
}