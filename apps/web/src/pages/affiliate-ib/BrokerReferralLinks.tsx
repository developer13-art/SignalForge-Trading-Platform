import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { BrokerIcon } from '../../components/ui/icons';

export function BrokerReferralLinks() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Broker Referral Links</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Your broker-specific referral links
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<BrokerIcon size={32} className="text-gray-400" />}
          title="No Broker Links"
          description="Connect with brokers to generate IB links."
        />
      </Card>
    </div>
  );
}