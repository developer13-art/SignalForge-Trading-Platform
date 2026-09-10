import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { AiIcon, SignalIcon, CheckIcon, ClockIcon } from '../../components/ui/icons';

export function AIMonitoring() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Monitoring</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">AI processing and performance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Messages Processed" value="0" icon={<SignalIcon size={20} className="text-primary-600" />} />
        <StatCard label="Signals Detected" value="0" icon={<AiIcon size={20} className="text-purple-600" />} iconBg="bg-purple-100 dark:bg-purple-900/30" />
        <StatCard label="Avg Confidence" value="0%" icon={<CheckIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Avg Latency" value="0ms" icon={<ClockIcon size={20} className="text-blue-600" />} iconBg="bg-blue-100 dark:bg-blue-900/30" />
      </div>
    </div>
  );
}