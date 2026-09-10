import React from 'react';
import { Card } from '../../components/ui/Card';
import { Progress } from '../../components/ui/Progress';
import { Badge } from '../../components/ui/Badge';

export function RiskOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Risk Overview</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Your current risk exposure
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Daily Loss Limit</h3>
          <Progress value={0} max={100} variant="success" showLabel />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            $0.00 of $300.00 daily limit used
          </p>
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Drawdown</h3>
          <Progress value={0} max={100} variant="success" showLabel />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            0% of 10% drawdown limit
          </p>
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Open Trades</h3>
          <Progress value={0} max={5} variant="primary" showLabel />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            0 of 5 maximum open trades
          </p>
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Account Status</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Emergency Stop</span>
              <Badge variant="success">Ready</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">News Filter</span>
              <Badge variant="success">Active</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}