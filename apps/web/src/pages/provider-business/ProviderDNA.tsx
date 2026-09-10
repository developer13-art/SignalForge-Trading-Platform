import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { KycIcon } from '../../components/ui/icons';

export function ProviderDNA() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Provider DNA</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Your provider's learned patterns and style
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<KycIcon size={32} className="text-gray-400" />}
          title="No DNA Yet"
          description="Your Provider DNA will be built automatically as you send signals."
        />
      </Card>
    </div>
  );
}