import React from 'react';
import { Card } from '../../components/ui/Card';
import { Progress } from '../../components/ui/Progress';
import { EmptyState } from '../../components/common/EmptyState';
import { AnalyticsIcon } from '../../components/ui/icons';

export function ConsistencyAnalysis() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Consistency Analysis</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          How consistent is the trader's performance?
        </p>
      </div>

      <Card>
        <div className="space-y-4">
          {[
            { label: 'Win Rate Stability', value: 0 },
            { label: 'Position Size Consistency', value: 0 },
            { label: 'Trade Frequency', value: 0 },
            { label: 'Risk Consistency', value: 0 },
          ].map((m) => (
            <div key={m.label}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">{m.label}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{m.value}%</span>
              </div>
              <Progress value={m.value} max={100} variant="primary" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}