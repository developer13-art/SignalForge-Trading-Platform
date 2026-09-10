import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export function RiskAssessment() {
  const checks = [
    'Martingale usage',
    'Grid trading patterns',
    'Unrealistic win rates',
    'Suspicious position sizing',
    'Recovery trading',
    'News exposure',
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Risk Assessment</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Automated risk detection
        </p>
      </div>

      <Card>
        <div className="space-y-3">
          {checks.map((check) => (
            <div key={check} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <span className="text-sm text-gray-700 dark:text-gray-300">{check}</span>
              <Badge variant="success">Safe</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}