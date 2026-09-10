import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { AnalyticsIcon } from '../../components/ui/icons';

export function TraderBehavior() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trader Behavior</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Behavioral patterns and habits
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<AnalyticsIcon size={32} className="text-gray-400" />}
          title="No Behavior Data"
          description="Behavior analysis will appear after enough trades."
        />
      </Card>
    </div>
  );
}