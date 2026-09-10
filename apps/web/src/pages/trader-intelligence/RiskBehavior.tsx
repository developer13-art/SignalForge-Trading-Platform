import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { RiskIcon } from '../../components/ui/icons';

export function RiskBehavior() {
  const traits = [
    { label: 'Risk per Trade', value: 'Unknown' },
    { label: 'Leverage Usage', value: 'Unknown' },
    { label: 'Stop Loss Usage', value: 'Unknown' },
    { label: 'Position Sizing', value: 'Unknown' },
    { label: 'Risk of Ruin', value: 'Unknown' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Risk Behavior</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          How this trader manages risk
        </p>
      </div>

      <Card>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center shrink-0">
            <RiskIcon size={24} className="text-yellow-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Risk Analysis</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Detected risk patterns from the trader's history
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {traits.map((t) => (
            <div key={t.label} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <span className="text-sm text-gray-700 dark:text-gray-300">{t.label}</span>
              <Badge variant="neutral">{t.value}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}