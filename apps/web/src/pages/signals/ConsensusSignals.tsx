import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { SignalIcon } from '../../components/ui/icons';

export function ConsensusSignals() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Consensus Signals</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Signals where multiple providers agree on direction
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<SignalIcon size={32} className="text-gray-400" />}
          title="No Consensus Signals"
          description="When multiple providers signal the same symbol with the same direction, the consensus will appear here."
        />
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">How Consensus Works</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="success">BUY</Badge>
              <span className="text-sm text-gray-600 dark:text-gray-400">Provider A</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="success">BUY</Badge>
              <span className="text-sm text-gray-600 dark:text-gray-400">Provider B</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="danger">SELL</Badge>
              <span className="text-sm text-gray-600 dark:text-gray-400">Provider C</span>
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <p className="text-sm font-medium text-green-800 dark:text-green-300">
              Consensus: BUY
            </p>
            <p className="text-xs text-green-700 dark:text-green-400 mt-1">
              Agreement: 2/3 (67%) • Confidence: High
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}