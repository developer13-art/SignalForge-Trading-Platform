import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

const styles = [
  { name: 'Scalping', description: 'Very short-term trades, seconds to minutes' },
  { name: 'Day Trading', description: 'Intraday trades, minutes to hours' },
  { name: 'Swing Trading', description: 'Multi-day to multi-week trades' },
  { name: 'Position Trading', description: 'Long-term trades, weeks to months' },
];

export function TradingStyle() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trading Style</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Classified trading style
        </p>
      </div>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Detected Style</h3>
        <Badge variant="info" size="lg">Not yet determined</Badge>
      </Card>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Style Types</h3>
        <div className="space-y-3">
          {styles.map((s) => (
            <div key={s.name} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <p className="font-medium text-gray-900 dark:text-white">{s.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}