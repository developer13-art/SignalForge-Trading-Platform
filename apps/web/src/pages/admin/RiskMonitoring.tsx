import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { RiskIcon, AlertIcon, CheckIcon, TradingIcon } from '../../components/ui/icons';

export function RiskMonitoring() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Risk Monitoring</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Platform-wide risk oversight</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Alerts" value="0" icon={<AlertIcon size={20} className="text-yellow-600" />} iconBg="bg-yellow-100 dark:bg-yellow-900/30" />
        <StatCard label="Risk Approvals" value="0" icon={<CheckIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Risk Rejections" value="0" icon={<RiskIcon size={20} className="text-red-600" />} iconBg="bg-red-100 dark:bg-red-900/30" />
        <StatCard label="Open Positions" value="0" icon={<TradingIcon size={20} className="text-primary-600" />} />
      </div>
    </div>
  );
}