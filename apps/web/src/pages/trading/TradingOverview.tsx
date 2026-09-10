import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { TradingIcon, TrendingUpIcon, TrendingDownIcon, DollarIcon } from '../../components/ui/icons';

export function TradingOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trading Overview</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Your complete trading activity summary
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Open Positions" value="0" icon={<TradingIcon size={20} className="text-primary-600" />} />
        <StatCard label="Today's Trades" value="0" icon={<TrendingUpIcon size={20} className="text-blue-600" />} iconBg="bg-blue-100 dark:bg-blue-900/30" />
        <StatCard label="Total P&L" value="$0.00" icon={<DollarIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Win Rate" value="0%" icon={<TrendingDownIcon size={20} className="text-yellow-600" />} iconBg="bg-yellow-100 dark:bg-yellow-900/30" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Open Positions</h3>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
            No open positions
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
            No recent activity
          </div>
        </Card>
      </div>
    </div>
  );
}