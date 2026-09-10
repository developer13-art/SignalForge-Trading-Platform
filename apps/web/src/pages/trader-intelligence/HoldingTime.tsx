import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { ClockIcon, AnalyticsIcon } from '../../components/ui/icons';

export function HoldingTime() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Holding Time</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Average trade holding duration
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Average" value="0 min" icon={<ClockIcon size={20} className="text-primary-600" />} />
        <StatCard label="Median" value="0 min" icon={<AnalyticsIcon size={20} className="text-purple-600" />} iconBg="bg-purple-100 dark:bg-purple-900/30" />
        <StatCard label="Longest" value="0 hr" icon={<ClockIcon size={20} className="text-orange-600" />} iconBg="bg-orange-100 dark:bg-orange-900/30" />
      </div>
    </div>
  );
}