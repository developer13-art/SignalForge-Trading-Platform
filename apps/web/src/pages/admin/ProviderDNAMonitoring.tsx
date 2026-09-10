import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { KycIcon } from '../../components/ui/icons';

export function ProviderDNAMonitoring() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Provider DNA Monitoring</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Monitor Provider DNA learning</p>
      </div>

      <Card>
        <EmptyState
          icon={<KycIcon size={32} className="text-gray-400" />}
          title="No DNA Activity"
          description="Provider DNA learning activity will appear here."
        />
      </Card>
    </div>
  );
}