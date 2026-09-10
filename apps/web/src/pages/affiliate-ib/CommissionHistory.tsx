import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { AuditIcon } from '../../components/ui/icons';

export function CommissionHistory() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Commission History</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          All commission payments
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<AuditIcon size={32} className="text-gray-400" />}
          title="No Commissions Yet"
          description="Commission history will appear here."
        />
      </Card>
    </div>
  );
}