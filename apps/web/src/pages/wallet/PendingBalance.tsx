import React from 'react';
import { Card } from '../../components/ui/Card';
import { ClockIcon } from '../../components/ui/icons';

export function PendingBalance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pending Balance</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Funds awaiting settlement
        </p>
      </div>

      <Card>
        <div className="text-center py-8">
          <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <ClockIcon size={28} className="text-yellow-600" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Pending Balance</p>
          <p className="text-4xl font-bold text-gray-900 dark:text-white mt-2">$0.00</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 max-w-md mx-auto">
            Pending funds become available once settlement periods complete and any applicable
            fraud checks pass.
          </p>
        </div>
      </Card>
    </div>
  );
}