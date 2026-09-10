import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { ClockIcon } from '../../components/ui/icons';

export function ExecutionHistory() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Execution History</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Detailed log of all trade executions
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<ClockIcon size={32} className="text-gray-400" />}
          title="No Execution History"
          description="Execution logs will appear here."
        />
      </Card>
    </div>
  );
}