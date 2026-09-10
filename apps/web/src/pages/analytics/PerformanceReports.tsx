import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { AuditIcon } from '../../components/ui/icons';

export function PerformanceReports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Performance Reports</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Generate detailed performance reports
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<AuditIcon size={32} className="text-gray-400" />}
          title="No Reports Yet"
          description="Generate your first report after you have trade history."
        />
      </Card>
    </div>
  );
}