import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { AiIcon, SignalIcon, KycIcon, CheckIcon, ShieldIcon } from '../../components/ui/icons';

export function AIIntelligenceOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Intelligence Overview</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          How AI processes your signals in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Messages Processed" value="0" icon={<SignalIcon size={20} className="text-primary-600" />} />
        <StatCard label="Signals Detected" value="0" icon={<AiIcon size={20} className="text-purple-600" />} iconBg="bg-purple-100 dark:bg-purple-900/30" />
        <StatCard label="Avg Confidence" value="0%" icon={<CheckIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Filtered" value="0" icon={<ShieldIcon size={20} className="text-yellow-600" />} iconBg="bg-yellow-100 dark:bg-yellow-900/30" />
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Processing Pipeline</h3>
        <div className="space-y-3">
          {[
            { label: 'Classification', description: 'Determines if message is a trading signal' },
            { label: 'Parsing', description: 'Extracts structured data via AI or Provider DNA' },
            { label: 'Normalization', description: 'Standardizes format across providers' },
            { label: 'Confidence Scoring', description: 'Calculates how confident the AI is' },
            { label: 'Validation', description: 'Checks for duplicates and conflicts' },
          ].map((step, i) => (
            <div key={step.label} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center font-semibold shrink-0">
                {i + 1}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{step.label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}