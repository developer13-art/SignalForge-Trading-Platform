import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { SignalIcon } from '../../components/ui/icons';

export function TrainingMessages() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Training Messages</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Messages used to train the Provider DNA
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<SignalIcon size={32} className="text-gray-400" />}
          title="No Training Messages"
          description="Training messages appear once a provider's history is imported."
        />
      </Card>
    </div>
  );
}