import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { AnalyticsIcon } from '../../components/ui/icons';

export function RiskBehaviorAnalysis() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Risk Behavior Analysis</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          How your risk behavior trends over time
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<AnalyticsIcon size={32} className="text-gray-400" />}
          title="No Data Yet"
          description="Risk behavior analysis will appear after enough trades."
        />
      </Card>
    </div>
  );
}