import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { ClockIcon } from '../../components/ui/icons';

export function WithdrawalStatus() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Withdrawal Status</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Track your withdrawal requests
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<ClockIcon size={32} className="text-gray-400" />}
          title="No Active Withdrawals"
          description="Your withdrawal requests will appear here."
        />
      </Card>
    </div>
  );
}