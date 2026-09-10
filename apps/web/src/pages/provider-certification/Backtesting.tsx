import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { AnalyticsIcon } from '../../components/ui/icons';

export function Backtesting() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Backtesting</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Replay your historical signals through our pipeline
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<AnalyticsIcon size={32} className="text-gray-400" />}
          title="No Backtesting Data"
          description="Import historical messages first to run backtesting."
        />
      </Card>
    </div>
  );
}