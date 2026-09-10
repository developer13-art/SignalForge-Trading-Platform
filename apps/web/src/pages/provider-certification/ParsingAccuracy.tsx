import React from 'react';
import { Card } from '../../components/ui/Card';
import { Progress } from '../../components/ui/Progress';
import { Badge } from '../../components/ui/Badge';

export function ParsingAccuracy() {
  const metrics = [
    { label: 'Symbol Detection', value: 0 },
    { label: 'Direction Detection', value: 0 },
    { label: 'Entry Price', value: 0 },
    { label: 'Stop Loss', value: 0 },
    { label: 'Take Profit', value: 0 },
    { label: 'Trade Management', value: 0 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Parsing Accuracy</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          How accurately we can parse your signals
        </p>
      </div>

      <Card>
        <div className="space-y-4">
          {metrics.map((m) => (
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