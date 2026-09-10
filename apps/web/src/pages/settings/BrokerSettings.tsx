import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { BrokerIcon, PlusIcon } from '../../components/ui/icons';

export function BrokerSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Broker Settings</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your connected brokers
          </p>
        </div>
        <Button>
          <PlusIcon size={18} /> Connect Broker
        </Button>
      </div>

      <Card>
        <EmptyState
          icon={<BrokerIcon size={32} className="text-gray-400" />}
          title="No Brokers Connected"
          description="Connect your MT4/MT5 account to enable automated trading."
        />
      </Card>
    </div>
  );
}