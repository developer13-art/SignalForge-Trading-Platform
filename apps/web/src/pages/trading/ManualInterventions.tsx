import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { TradingIcon } from '../../components/ui/icons';

export function ManualInterventions() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manual Interventions</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Trades where you manually intervened
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<TradingIcon size={32} className="text-gray-400" />}
          title="No Manual Interventions"
          description="Any manual changes to automated trades will appear here."
        />
      </Card>
    </div>
  );
}