import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { SignalIcon } from '../../components/ui/icons';

export function ProviderConsensus() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Provider Consensus</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          When multiple providers agree on direction
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<SignalIcon size={32} className="text-gray-400" />}
          title="No Consensus Signals"
          description="Consensus will appear when multiple subscribed providers signal the same symbol."
        />
      </Card>
    </div>
  );
}