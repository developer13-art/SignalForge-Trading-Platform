import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { UsersIcon } from '../../components/ui/icons';

export function WhiteLabelUsers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">White Label Users</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Users on your platform
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<UsersIcon size={32} className="text-gray-400" />}
          title="No Users Yet"
          description="Users registered on your white label platform will appear here."
        />
      </Card>
    </div>
  );
}