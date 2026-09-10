import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { UsersIcon } from '../../components/ui/icons';

export function AffiliateReferrals() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Affiliate Referrals</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Users you've referred as an affiliate
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<UsersIcon size={32} className="text-gray-400" />}
          title="No Referrals Yet"
          description="Share your affiliate links to get started."
        />
      </Card>
    </div>
  );
}