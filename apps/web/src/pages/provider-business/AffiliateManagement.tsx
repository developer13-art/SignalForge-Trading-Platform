import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { ReferralIcon } from '../../components/ui/icons';

export function AffiliateManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Affiliate Management</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage affiliate partners and commissions
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<ReferralIcon size={32} className="text-gray-400" />}
          title="No Affiliates"
          description="Recruit affiliates to promote your signal service."
        />
      </Card>
    </div>
  );
}