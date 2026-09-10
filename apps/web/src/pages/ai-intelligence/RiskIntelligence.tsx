import React from 'react';
import { Card } from '../../components/ui/Card';
import { ShieldIcon } from '../../components/ui/icons';

const checks = [
  { name: 'Symbol volatility analysis', description: 'Evaluates if symbol is currently volatile' },
  { name: 'News event proximity', description: 'Detects high-impact news windows' },
  { name: 'Correlation exposure', description: 'Checks for correlated positions' },
  { name: 'Historical success rate', description: 'Reviews past performance for this symbol/pattern' },
  { name: 'Market session context', description: 'Determines if the session is favorable' },
  { name: 'Spread analysis', description: 'Current spread vs typical spread' },
];

export function RiskIntelligence() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Risk Intelligence</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          AI-powered contextual risk analysis
        </p>
      </div>

      <Card>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center shrink-0">
            <ShieldIcon size={24} className="text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Contextual Risk Checks</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Additional risk context beyond the standard risk profile.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {checks.map((check) => (
            <div key={check.name} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <p className="font-medium text-gray-900 dark:text-white text-sm">{check.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{check.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}