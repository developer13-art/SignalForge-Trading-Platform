import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { SourceIcon } from '../../components/ui/icons';

export function SignalSourceManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Signal Source Management</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage all signal sources</p>
      </div>

      <Card>
        <EmptyState
          icon={<SourceIcon size={32} className="text-gray-400" />}
          title="No Signal Sources"
          description="Signal sources will appear here."
        />
      </Card>
    </div>
  );
}