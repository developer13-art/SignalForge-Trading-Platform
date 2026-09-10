import React from 'react';
import { Card } from '../../components/ui/Card';
import { Progress } from '../../components/ui/Progress';
import { Badge } from '../../components/ui/Badge';

export function TraderRisk() {
  const metrics = [
    { label: 'Risk Score', value: 0, variant: 'success' as const },
    { label: 'Leverage Usage', value: 0, variant: 'success' as const },
    { label: 'Position Size Variance', value: 0, variant: 'success' as const },
    { label: 'Stop Loss Usage', value: 100, variant: 'success' as const },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trader Risk</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Risk behavior of this trader
        </p>
      </div>

      <Card>
        <div className="space-y-4">
          {metrics.map((m) => (
            <div key={m.label}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{m.label}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{m.value}%</span>
              </div>
              <Progress value={m.value} max={100} variant={m.variant} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}