import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { TradingIcon } from '../../components/ui/icons';

export function TradeShadow() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trade Shadow</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Compare your trade management with the provider's
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<TradingIcon size={32} className="text-gray-400" />}
          title="No Shadow Data"
          description="When you manage a trade differently from the provider, the shadow comparison will appear here."
        />
      </Card>
    </div>
  );
}