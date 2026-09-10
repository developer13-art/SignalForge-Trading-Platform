import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export function LiveSignalMonitor() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Live Signal Monitor</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Real-time signal flow</p>
        </div>
        <Badge variant="success" dot>Live</Badge>
      </div>

      <Card>
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No signals in the last 5 minutes
        </div>
      </Card>
    </div>
  );
}