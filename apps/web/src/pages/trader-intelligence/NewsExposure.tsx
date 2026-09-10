import React from 'react';
import { Card } from '../../components/ui/Card';
import { Progress } from '../../components/ui/Progress';
import { Badge } from '../../components/ui/Badge';

export function NewsExposure() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">News Exposure</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          How much this trader is exposed to news events
        </p>
      </div>

      <Card>
        <div className="text-center py-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">News Exposure Level</p>
          <p className="text-4xl font-bold text-green-600 mt-2">Low</p>
          <Badge variant="success" className="mt-3">Safe</Badge>
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Exposure Details</h3>
        <div className="space-y-3">
          {[
            { label: 'Trades During High-Impact News', value: 0 },
            { label: 'Pre-News Positions', value: 0 },
            { label: 'Post-News Positions', value: 0 },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between mb-1 text-sm">
                <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
                <span className="text-gray-500 dark:text-gray-400">{item.value}%</span>
              </div>
              <Progress value={item.value} max={100} variant="success" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}