import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { TrendingUpIcon, TrendingDownIcon, AnalyticsIcon } from '../../components/ui/icons';

export function AverageRR() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Average Risk/Reward</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Typical risk to reward ratio
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Avg Win" value="$0.00" icon={<TrendingUpIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Avg Loss" value="$0.00" icon={<TrendingDownIcon size={20} className="text-red-600" />} iconBg="bg-red-100 dark:bg-red-900/30" />
        <StatCard label="Avg R:R" value="0.00" icon={<AnalyticsIcon size={20} className="text-primary-600" />} />
      </div>
    </div>
  );
}