import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { UsersIcon, TrendingUpIcon } from '../../components/ui/icons';

export function UserGrowth() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Growth</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Platform user growth trends</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Users" value="0" icon={<UsersIcon size={20} className="text-primary-600" />} />
        <StatCard label="New This Month" value="0" icon={<TrendingUpIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Growth Rate" value="0%" icon={<TrendingUpIcon size={20} className="text-blue-600" />} iconBg="bg-blue-100 dark:bg-blue-900/30" />
      </div>
    </div>
  );
}