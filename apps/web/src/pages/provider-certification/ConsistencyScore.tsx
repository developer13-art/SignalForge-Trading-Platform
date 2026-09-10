import React from 'react';
import { Card } from '../../components/ui/Card';
import { Progress } from '../../components/ui/Progress';

export function ConsistencyScore() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Consistency Score</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          How consistent your signals are over time
        </p>
      </div>

      <Card>
        <div className="text-center py-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">Overall Consistency</p>
          <p className="text-5xl font-bold text-primary-600 mt-2">0%</p>
        </div>
        <div className="space-y-3 mt-6">
          {[
            { label: 'Signal Frequency', value: 0 },
            { label: 'Format Consistency', value: 0 },
            { label: 'Risk Consistency', value: 0 },
          ].map((m) => (
            <div key={m.label}>
              <div className="flex justify-between mb-1 text-sm">
                <span className="text-gray-700 dark:text-gray-300">{m.label}</span>
                <span className="text-gray-500 dark:text-gray-400">{m.value}%</span>
              </div>
              <Progress value={m.value} max={100} variant="primary" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}