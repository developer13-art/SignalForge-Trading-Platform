import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { ClockIcon } from '../../components/ui/icons';

export function BehaviorTimeline() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Behavior Timeline</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Evolution of trading behavior over time
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<ClockIcon size={32} className="text-gray-400" />}
          title="No Behavior History"
          description="Behavior timeline will appear after enough data."
        />
      </Card>
    </div>
  );
}