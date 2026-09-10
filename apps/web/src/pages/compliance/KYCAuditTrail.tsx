import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { AuditIcon } from '../../components/ui/icons';

export function KYCAuditTrail() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">KYC Audit Trail</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Complete KYC action history</p>
      </div>

      <Card>
        <EmptyState
          icon={<AuditIcon size={32} className="text-gray-400" />}
          title="No Audit Records"
          description="KYC review activity will appear here."
        />
      </Card>
    </div>
  );
}