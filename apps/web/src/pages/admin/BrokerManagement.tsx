import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { BrokerIcon } from '../../components/ui/icons';

export function BrokerManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Broker Management</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage connected broker accounts</p>
      </div>

      <Card>
        <EmptyState
          icon={<BrokerIcon size={32} className="text-gray-400" />}
          title="No Broker Accounts"
          description="Broker accounts will appear here."
        />
      </Card>
    </div>
  );
}