import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { StarIcon } from '../../components/ui/icons';

export function ProviderReviews() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Provider Reviews</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          What subscribers are saying
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<StarIcon size={32} className="text-gray-400" />}
          title="No Reviews Yet"
          description="Be the first to review this provider."
        />
      </Card>
    </div>
  );
}