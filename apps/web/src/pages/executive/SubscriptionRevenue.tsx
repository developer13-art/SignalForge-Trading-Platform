import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { SubscriptionIcon, DollarIcon, TrendingUpIcon } from '../../components/ui/icons';

export function SubscriptionRevenue() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Subscription Revenue</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Revenue from platform subscriptions</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="MRR" value="$0.00" icon={<DollarIcon size={20} className="text-primary-600" />} />
        <StatCard label="ARR" value="$0.00" icon={<TrendingUpIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Active Subs" value="0" icon={<SubscriptionIcon size={20} className="text-blue-600" />} iconBg="bg-blue-100 dark:bg-blue-900/30" />
      </div>
    </div>
  );
}