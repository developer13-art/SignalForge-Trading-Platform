import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { TraderIcon } from '../../components/ui/icons';

export function TraderManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trader Management</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage manual traders</p>
      </div>

      <Card>
        <EmptyState
          icon={<TraderIcon size={32} className="text-gray-400" />}
          title="No Traders Yet"
          description="Traders will appear here once registered."
        />
      </Card>
    </div>
  );
}