import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { ProviderIcon, TrendingUpIcon } from '../../components/ui/icons';

export function ProviderGrowth() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Provider Growth</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Provider acquisition trends</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Providers" value="0" icon={<ProviderIcon size={20} className="text-primary-600" />} />
        <StatCard label="New This Month" value="0" icon={<TrendingUpIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Certified" value="0" icon={<ProviderIcon size={20} className="text-purple-600" />} iconBg="bg-purple-100 dark:bg-purple-900/30" />
      </div>
    </div>
  );
}