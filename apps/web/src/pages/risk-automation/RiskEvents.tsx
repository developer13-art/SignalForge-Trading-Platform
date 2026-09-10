import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { AlertIcon } from '../../components/ui/icons';

export function RiskEvents() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Risk Events</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Log of all risk decisions and rejections
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<AlertIcon size={32} className="text-gray-400" />}
          title="No Risk Events"
          description="Risk decisions will appear here as your account trades."
        />
      </Card>
    </div>
  );
}