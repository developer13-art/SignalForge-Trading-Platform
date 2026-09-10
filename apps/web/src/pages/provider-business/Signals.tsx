import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { SignalIcon } from '../../components/ui/icons';

export function Signals() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Signals</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Your signal history as a provider
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<SignalIcon size={32} className="text-gray-400" />}
          title="No Signals Yet"
          description="Signals you send to your subscribers will appear here."
        />
      </Card>
    </div>
  );
}