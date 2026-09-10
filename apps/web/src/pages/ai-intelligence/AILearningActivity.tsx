import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { AiIcon } from '../../components/ui/icons';

export function AILearningActivity() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Learning Activity</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Real-time log of AI learning events
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<AiIcon size={32} className="text-gray-400" />}
          title="No Learning Activity"
          description="When the AI encounters unfamiliar patterns, learning events will be logged here."
        />
      </Card>
    </div>
  );
}