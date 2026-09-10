import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { AuditIcon } from '../../components/ui/icons';

export function SystemEventTimeline() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Event Timeline</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">All platform events in real-time</p>
      </div>

      <Card>
        <EmptyState
          icon={<AuditIcon size={32} className="text-gray-400" />}
          title="No Events"
          description="System events will appear here as they occur."
        />
      </Card>
    </div>
  );
}