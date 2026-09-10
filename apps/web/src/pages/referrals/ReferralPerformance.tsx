import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { DollarIcon, TrendingUpIcon, AnalyticsIcon } from '../../components/ui/icons';

export function ReferralPerformance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Referral Performance</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Performance metrics from your referrals
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Eligible Net Profit" value="$0.00" icon={<DollarIcon size={20} className="text-primary-600" />} />
        <StatCard label="Reward Rate" value="0.10%" icon={<TrendingUpIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Total Rewards" value="$0.00" icon={<AnalyticsIcon size={20} className="text-purple-600" />} iconBg="bg-purple-100 dark:bg-purple-900/30" />
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Performance</h3>
        <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
          Performance chart will appear once referrals start trading
        </div>
      </Card>
    </div>
  );
}