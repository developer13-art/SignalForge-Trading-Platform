import React from 'react';
import { Card } from '../../components/ui/Card';
import { CheckIcon } from '../../components/ui/icons';

const steps = [
  { label: 'Fingerprint Generation', description: 'Every signal gets a unique fingerprint based on normalized content' },
  { label: 'Lookback Window', description: 'Checks fingerprints in the last N minutes for matches' },
  { label: 'Similarity Scoring', description: 'Uses fuzzy matching to detect near-duplicates' },
  { label: 'Idempotency Keys', description: 'Prevents processing the same source message twice' },
  { label: 'Decision', description: 'Duplicates are rejected and logged, never executed' },
];

export function DuplicateDetection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Duplicate Detection</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          How SignalForge prevents duplicate trades
        </p>
      </div>

      <Card>
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                <CheckIcon size={16} className="text-primary-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{step.label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}