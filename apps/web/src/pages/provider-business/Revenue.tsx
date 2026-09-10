import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { DollarIcon, TrendingUpIcon, WalletIcon, AnalyticsIcon } from '../../components/ui/icons';

export function Revenue() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Revenue</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Your revenue and earnings
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value="$0.00" icon={<DollarIcon size={20} className="text-primary-600" />} />
        <StatCard label="This Month" value="$0.00" icon={<TrendingUpIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Available" value="$0.00" icon={<WalletIcon size={20} className="text-blue-600" />} iconBg="bg-blue-100 dark:bg-blue-900/30" />
        <StatCard label="Withdrawn" value="$0.00" icon={<AnalyticsIcon size={20} className="text-purple-600" />} iconBg="bg-purple-100 dark:bg-purple-900/30" />
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Chart</h3>
        <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
          Revenue chart will appear once you have subscribers
        </div>
      </Card>
    </div>
  );
}