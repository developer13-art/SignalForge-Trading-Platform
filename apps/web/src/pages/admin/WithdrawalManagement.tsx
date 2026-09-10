import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { WalletIcon } from '../../components/ui/icons';

export function WithdrawalManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Withdrawal Management</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Approve and process withdrawals</p>
      </div>

      <Card>
        <EmptyState
          icon={<WalletIcon size={32} className="text-gray-400" />}
          title="No Pending Withdrawals"
          description="Withdrawal requests will appear here."
        />
      </Card>
    </div>
  );
}