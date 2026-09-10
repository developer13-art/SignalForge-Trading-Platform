import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { SignalIcon } from '../../components/ui/icons';

export function ConsensusEngine() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Consensus Engine</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          When multiple providers agree, confidence increases
        </p>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">How Consensus Works</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-3">Example Scenario</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="success">BUY</Badge>
                <span className="text-sm text-gray-600 dark:text-gray-400">Provider A • 92% confidence</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="success">BUY</Badge>
                <span className="text-sm text-gray-600 dark:text-gray-400">Provider B • 88% confidence</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="success">BUY</Badge>
                <span className="text-sm text-gray-600 dark:text-gray-400">Provider C • 85% confidence</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-2">
              <SignalIcon size={20} className="text-green-600" />
              <span className="font-semibold text-green-800 dark:text-green-300">Consensus: BUY</span>
            </div>
            <p className="text-sm text-green-700 dark:text-green-400">
              Agreement: 3/3 (100%) • Aggregate confidence: High
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}