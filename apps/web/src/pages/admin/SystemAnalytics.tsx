import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { UsersIcon, TradingIcon, SignalIcon, AnalyticsIcon } from '../../components/ui/icons';

export function SystemAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Analytics</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Platform-wide analytics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Users" value="0" icon={<UsersIcon size={20} className="text-primary-600" />} />
        <StatCard label="Total Trades" value="0" icon={<TradingIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Total Signals" value="0" icon={<SignalIcon size={20} className="text-blue-600" />} iconBg="bg-blue-100 dark:bg-blue-900/30" />
        <StatCard label="Platform Uptime" value="99.9%" icon={<AnalyticsIcon size={20} className="text-purple-600" />} iconBg="bg-purple-100 dark:bg-purple-900/30" />
      </div>
    </div>
  );
}