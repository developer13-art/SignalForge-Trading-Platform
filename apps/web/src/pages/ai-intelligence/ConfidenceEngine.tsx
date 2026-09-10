import React from 'react';
import { Card } from '../../components/ui/Card';
import { Progress } from '../../components/ui/Progress';
import { Badge } from '../../components/ui/Badge';

const factors = [
  { name: 'Symbol Detection', description: 'How confidently the symbol was identified', weight: 30 },
  { name: 'Direction Detection', description: 'Clarity of BUY/SELL intent', weight: 25 },
  { name: 'Entry Price', description: 'Presence and validity of entry price', weight: 15 },
  { name: 'Stop Loss', description: 'Presence and validity of SL', weight: 15 },
  { name: 'Take Profit', description: 'Presence and validity of TP', weight: 15 },
];

export function ConfidenceEngine() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Confidence Engine</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          How signal confidence is calculated
        </p>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Confidence Factors</h3>
        <div className="space-y-4">
          {factors.map((factor) => (
            <div key={factor.name}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{factor.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{factor.description}</p>
                </div>
                <Badge variant="primary">{factor.weight}%</Badge>
              </div>
              <Progress value={factor.weight} max={100} variant="primary" size="sm" />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Confidence Tiers</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Very High', range: '90-100%', variant: 'success' as const },
            { label: 'High', range: '75-89%', variant: 'success' as const },
            { label: 'Medium', range: '60-74%', variant: 'warning' as const },
            { label: 'Low', range: '0-59%', variant: 'danger' as const },
          ].map((tier) => (
            <div key={tier.label} className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <Badge variant={tier.variant}>{tier.label}</Badge>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{tier.range}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}