import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { KycIcon, SignalIcon, CheckIcon, AnalyticsIcon } from '../../components/ui/icons';

export function DNAOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Provider DNA Overview</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Learned patterns and behavior for each provider
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Providers Tracked" value="0" icon={<KycIcon size={20} className="text-primary-600" />} />
        <StatCard label="Patterns Learned" value="0" icon={<SignalIcon size={20} className="text-purple-600" />} iconBg="bg-purple-100 dark:bg-purple-900/30" />
        <StatCard label="Fast Path Hits" value="0" icon={<CheckIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Avg DNA Confidence" value="0%" icon={<AnalyticsIcon size={20} className="text-blue-600" />} iconBg="bg-blue-100 dark:bg-blue-900/30" />
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">DNA Learning Overview</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Provider DNA is built automatically when you connect a signal provider. The AI analyzes
          historical messages to understand their language, abbreviations, symbols, and trading style.
        </p>
      </Card>
    </div>
  );
}