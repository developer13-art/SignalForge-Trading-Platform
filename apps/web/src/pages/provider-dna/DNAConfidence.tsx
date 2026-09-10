import React from 'react';
import { Card } from '../../components/ui/Card';
import { Progress } from '../../components/ui/Progress';
import { EmptyState } from '../../components/common/EmptyState';
import { AnalyticsIcon } from '../../components/ui/icons';

export function DNAConfidence() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">DNA Confidence</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          How confident the AI is in each provider's DNA
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<AnalyticsIcon size={32} className="text-gray-400" />}
          title="No DNA Confidence Data"
          description="Connect a provider to build their DNA confidence."
        />
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Confidence Levels</h3>
        <div className="space-y-4">
          {[
            { label: 'Very High (90-100%)', description: 'AI has very high confidence in provider patterns' },
            { label: 'High (75-89%)', description: 'AI has high confidence; fast path used often' },
            { label: 'Medium (60-74%)', description: 'AI has moderate confidence; learning in progress' },
            { label: 'Low (0-59%)', description: 'AI has low confidence; full AI inference used' },
          ].map((level) => (
            <div key={level.label} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{level.label}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{level.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}