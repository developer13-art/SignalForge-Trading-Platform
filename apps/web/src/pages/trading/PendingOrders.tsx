import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { ClockIcon } from '../../components/ui/icons';

export function PendingOrders() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pending Orders</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Limit and stop orders waiting to be triggered
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<ClockIcon size={32} className="text-gray-400" />}
          title="No Pending Orders"
          description="Limit and stop orders will appear here."
        />
      </Card>
    </div>
  );
}