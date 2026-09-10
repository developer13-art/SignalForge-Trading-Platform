import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { DollarIcon, TrendingUpIcon, AnalyticsIcon, WalletIcon } from '../../components/ui/icons';

export function AccountMetrics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Metrics</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Detailed account performance metrics
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Balance" value="$0.00" icon={<WalletIcon size={20} className="text-primary-600" />} />
        <StatCard label="Equity" value="$0.00" icon={<DollarIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Free Margin" value="$0.00" icon={<TrendingUpIcon size={20} className="text-blue-600" />} iconBg="bg-blue-100 dark:bg-blue-900/30" />
        <StatCard label="Margin Level" value="0%" icon={<AnalyticsIcon size={20} className="text-purple-600" />} iconBg="bg-purple-100 dark:bg-purple-900/30" />
      </div>
    </div>
  );
}