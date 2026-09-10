import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { ProviderIcon } from '../../components/ui/icons';

export function ProviderManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Provider Management</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage signal providers</p>
      </div>

      <Card>
        <EmptyState
          icon={<ProviderIcon size={32} className="text-gray-400" />}
          title="No Providers Yet"
          description="Providers will appear here once registered."
        />
      </Card>
    </div>
  );
}