import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { SignalIcon } from '../../components/ui/icons';

export function ProviderSignals() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Provider Signals</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Historical signals from this provider
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<SignalIcon size={32} className="text-gray-400" />}
          title="No Signals Available"
          description="Provider signals will appear here once available."
        />
      </Card>
    </div>
  );
}