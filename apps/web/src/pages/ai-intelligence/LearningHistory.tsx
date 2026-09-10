import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { AiIcon } from '../../components/ui/icons';

export function LearningHistory() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Learning History</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Historical log of AI learning events
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<AiIcon size={32} className="text-gray-400" />}
          title="No Learning History"
          description="Learning events will appear here as the AI encounters new patterns."
        />
      </Card>
    </div>
  );
}