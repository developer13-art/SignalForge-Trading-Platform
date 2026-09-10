import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { AnalyticsIcon, ClockIcon, CheckIcon, AlertIcon } from '../../components/ui/icons';

export function PlatformPerformance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Platform Performance</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Technical and operational metrics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Uptime" value="99.9%" icon={<CheckIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Avg Latency" value="0ms" icon={<ClockIcon size={20} className="text-blue-600" />} iconBg="bg-blue-100 dark:bg-blue-900/30" />
        <StatCard label="Error Rate" value="0%" icon={<AlertIcon size={20} className="text-red-600" />} iconBg="bg-red-100 dark:bg-red-900/30" />
        <StatCard label="Requests/min" value="0" icon={<AnalyticsIcon size={20} className="text-purple-600" />} iconBg="bg-purple-100 dark:bg-purple-900/30" />
      </div>
    </div>
  );
}