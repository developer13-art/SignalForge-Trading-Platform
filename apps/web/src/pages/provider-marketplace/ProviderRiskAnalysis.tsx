import React from 'react';
import { Card } from '../../components/ui/Card';
import { Progress } from '../../components/ui/Progress';
import { Badge } from '../../components/ui/Badge';

export function ProviderRiskAnalysis() {
  const metrics = [
    { label: 'Max Drawdown', value: 0, max: 100, variant: 'success' as const },
    { label: 'Volatility', value: 0, max: 100, variant: 'success' as const },
    { label: 'Consistency', value: 0, max: 100, variant: 'success' as const },
    { label: 'Risk Score', value: 0, max: 100, variant: 'success' as const },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Provider Risk Analysis</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Risk profile of this provider
        </p>
      </div>

      <Card>
        <div className="space-y-4">
          {metrics.map((m) => (
            <div key={m.label}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{m.label}</span>
                <Badge variant="success">Low Risk</Badge>
              </div>
              <Progress value={m.value} max={m.max} variant={m.variant} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}