import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { SignalIcon, CheckIcon, AnalyticsIcon } from '../../components/ui/icons';

export function TrainingDataset() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Training Dataset</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Messages used to train your Provider DNA
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Messages" value="0" icon={<SignalIcon size={20} className="text-primary-600" />} />
        <StatCard label="Signals Detected" value="0" icon={<CheckIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Unique Patterns" value="0" icon={<AnalyticsIcon size={20} className="text-purple-600" />} iconBg="bg-purple-100 dark:bg-purple-900/30" />
      </div>

      <Card>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
          Import historical messages to build your training dataset.
        </p>
      </Card>
    </div>
  );
}