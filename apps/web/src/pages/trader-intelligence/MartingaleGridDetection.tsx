import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CheckIcon, AlertIcon } from '../../components/ui/icons';

export function MartingaleGridDetection() {
  const checks = [
    { label: 'Martingale Pattern', detected: false, description: 'Increasing position size after losses' },
    { label: 'Grid Pattern', detected: false, description: 'Multiple positions at increasing distances' },
    { label: 'Hedging Pattern', detected: false, description: 'Opposite positions on same symbol' },
    { label: 'Averaging Down', detected: false, description: 'Adding to losing positions' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Martingale & Grid Detection</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Detect high-risk trading patterns
        </p>
      </div>

      <Card>
        <div className="space-y-3">
          {checks.map((check) => (
            <div key={check.label} className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                check.detected ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
              }`}>
                {check.detected ? <AlertIcon size={14} /> : <CheckIcon size={14} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900 dark:text-white">{check.label}</p>
                  <Badge variant={check.detected ? 'danger' : 'success'}>
                    {check.detected ? 'Detected' : 'Safe'}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{check.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}