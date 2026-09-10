import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export function LiveTradingStatus() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Live Trading Status</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Real-time status of your trading activity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Trading Environment</p>
          <div className="mt-2">
            <Badge variant="info" size="lg">DEMO</Badge>
          </div>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Automation</p>
          <div className="mt-2">
            <Badge variant="neutral" size="lg">Disabled</Badge>
          </div>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Broker Connection</p>
          <div className="mt-2">
            <Badge variant="neutral" size="lg">Not Connected</Badge>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Current Positions</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
          No open positions
        </p>
      </Card>
    </div>
  );
}