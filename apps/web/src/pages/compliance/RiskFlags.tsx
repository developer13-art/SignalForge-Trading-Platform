import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { AlertIcon } from '../../components/ui/icons';

export function RiskFlags() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Risk Flags</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Flagged accounts requiring review</p>
      </div>

      <Card>
        <EmptyState
          icon={<AlertIcon size={32} className="text-gray-400" />}
          title="No Risk Flags"
          description="Flagged accounts will appear here."
        />
      </Card>
    </div>
  );
}