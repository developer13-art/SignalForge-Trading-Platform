import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { AnalyticsIcon } from '../../components/ui/icons';

export function PortfolioOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio Overview</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your overall trading portfolio</p>
      </div>

      <Card>
        <EmptyState
          icon={<AnalyticsIcon size={32} className="text-gray-400" />}
          title="No Portfolio Data"
          description="Connect a broker account and start trading to see your portfolio here."
        />
      </Card>
    </div>
  );
}