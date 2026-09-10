import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { AuditIcon } from '../../components/ui/icons';

export function DNAVersionHistory() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">DNA Version History</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Track how each provider's DNA has evolved
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<AuditIcon size={32} className="text-gray-400" />}
          title="No Version History"
          description="DNA version history will appear as providers are learned."
        />
      </Card>
    </div>
  );
}