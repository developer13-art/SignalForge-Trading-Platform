import React from 'react';
import { Card } from '../../components/ui/Card';
import { Progress } from '../../components/ui/Progress';
import { Badge } from '../../components/ui/Badge';

export function QualityScore() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quality Score</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Overall quality grade
        </p>
      </div>

      <Card>
        <div className="text-center py-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">Overall Quality</p>
          <p className="text-6xl font-extrabold text-primary-600 mt-2">--</p>
          <div className="mt-3">
            <Badge variant="neutral" size="lg">Not Rated</Badge>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {[
            { label: 'Parsing Accuracy', weight: 30 },
            { label: 'Signal Consistency', weight: 25 },
            { label: 'Performance', weight: 25 },
            { label: 'Risk Management', weight: 20 },
          ].map((f) => (
            <div key={f.label}>
              <div className="flex justify-between mb-1 text-sm">
                <span className="text-gray-700 dark:text-gray-300">{f.label}</span>
                <span className="text-gray-500 dark:text-gray-400">Weight: {f.weight}%</span>
              </div>
              <Progress value={0} max={100} variant="primary" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}