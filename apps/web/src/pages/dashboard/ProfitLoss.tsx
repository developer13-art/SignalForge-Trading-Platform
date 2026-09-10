import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { DollarIcon, TrendingUpIcon, TrendingDownIcon, AnalyticsIcon } from '../../components/ui/icons';

export function ProfitLoss() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profit & Loss</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Your trading performance summary
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total P&L" value="$0.00" icon={<DollarIcon size={20} className="text-primary-600" />} />
        <StatCard label="Winning Trades" value="0" icon={<TrendingUpIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Losing Trades" value="0" icon={<TrendingDownIcon size={20} className="text-red-600" />} iconBg="bg-red-100 dark:bg-red-900/30" />
        <StatCard label="Win Rate" value="0%" icon={<AnalyticsIcon size={20} className="text-blue-600" />} iconBg="bg-blue-100 dark:bg-blue-900/30" />
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Chart</h3>
        <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
          P&L chart will appear here once you have trades
        </div>
      </Card>
    </div>
  );
}