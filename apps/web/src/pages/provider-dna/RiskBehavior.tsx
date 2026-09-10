import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { RiskIcon } from '../../components/ui/icons';

export function RiskBehavior() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Provider Risk Behavior</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Learned risk management style per provider
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<RiskIcon size={32} className="text-gray-400" />}
          title="No Risk Behavior Data"
          description="Risk behavior is learned from historical provider signals."
        />
      </Card>
    </div>
  );
}