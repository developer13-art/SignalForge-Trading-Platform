import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { SignalIcon } from '../../components/ui/icons';

export function DuplicateSignals() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Duplicate Signals</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Signals identified as duplicates (already processed)
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<SignalIcon size={32} className="text-gray-400" />}
          title="No Duplicate Signals"
          description="Duplicate detection is active. Any duplicate signals will appear here."
        />
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">How Duplicate Detection Works</h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 shrink-0" />
            Each message is fingerprinted using signal fingerprinting
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 shrink-0" />
            Idempotency keys prevent processing the same message twice
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 shrink-0" />
            Similar signals within a time window are flagged as potential duplicates
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 shrink-0" />
            Duplicates never result in multiple trades
          </li>
        </ul>
      </Card>
    </div>
  );
}