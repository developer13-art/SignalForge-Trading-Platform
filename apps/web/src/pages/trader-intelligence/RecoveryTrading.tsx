import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { AlertIcon } from '../../components/ui/icons';

export function RecoveryTrading() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Recovery Trading</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Detects "revenge trading" behavior after losses
        </p>
      </div>

      <Card>
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertIcon size={32} className="text-green-600" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Recovery Trading Pattern</p>
          <p className="text-2xl font-bold text-green-600 mt-2">Not Detected</p>
          <Badge variant="success" className="mt-3">Safe</Badge>
        </div>
      </Card>
    </div>
  );
}