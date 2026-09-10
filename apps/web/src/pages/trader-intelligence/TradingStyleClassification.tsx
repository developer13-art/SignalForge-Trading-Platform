import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export function TradingStyleClassification() {
  const styles = [
    { name: 'Scalper', probability: 0 },
    { name: 'Day Trader', probability: 0 },
    { name: 'Swing Trader', probability: 0 },
    { name: 'Position Trader', probability: 0 },
    { name: 'News Trader', probability: 0 },
    { name: 'Algorithmic', probability: 0 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trading Style Classification</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          AI-classified trading style
        </p>
      </div>

      <Card>
        <div className="text-center py-6 mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">Detected Style</p>
          <Badge variant="info" size="lg" className="mt-3">Not Determined</Badge>
        </div>

        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Probability Distribution</h3>
        <div className="space-y-2">
          {styles.map((s) => (
            <div key={s.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <span className="text-sm text-gray-700 dark:text-gray-300">{s.name}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{s.probability}%</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}