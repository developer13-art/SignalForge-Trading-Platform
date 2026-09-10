import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { UsersIcon, TrendingUpIcon, AnalyticsIcon } from '../../components/ui/icons';

export function RetentionConversion() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Retention & Conversion</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">User retention and conversion metrics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="30-Day Retention" value="0%" icon={<UsersIcon size={20} className="text-primary-600" />} />
        <StatCard label="Free-to-Paid" value="0%" icon={<TrendingUpIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Churn Rate" value="0%" icon={<AnalyticsIcon size={20} className="text-red-600" />} iconBg="bg-red-100 dark:bg-red-900/30" />
      </div>
    </div>
  );
}