import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { MarketplaceIcon } from '../../components/ui/icons';

export function MarketplaceModeration() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Marketplace Moderation</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Review marketplace content</p>
      </div>

      <Card>
        <EmptyState
          icon={<MarketplaceIcon size={32} className="text-gray-400" />}
          title="Nothing to Moderate"
          description="Flagged content and provider applications will appear here."
        />
      </Card>
    </div>
  );
}