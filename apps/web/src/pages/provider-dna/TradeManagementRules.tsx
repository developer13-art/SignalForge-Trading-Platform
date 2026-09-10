import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { ShieldIcon } from '../../components/ui/icons';

const examples = [
  { phrase: '"Secure Profit"', action: 'MOVE_SL_TO_BREAK_EVEN' },
  { phrase: '"Close Some"', action: 'PARTIAL_CLOSE_50' },
  { phrase: '"Trail"', action: 'TRAILING_STOP' },
  { phrase: '"TP1 Hit"', action: 'TAKE_PROFIT_1_HIT' },
  { phrase: '"All Out"', action: 'CLOSE_ALL' },
];

export function TradeManagementRules() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trade Management Rules</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Learned instructions for managing existing trades
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<ShieldIcon size={32} className="text-gray-400" />}
          title="No Management Rules"
          description="Management rules are learned from provider trade management messages."
        />
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Examples</h3>
        <div className="space-y-2">
          {examples.map((ex) => (
            <div key={ex.phrase} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <span className="text-sm text-gray-700 dark:text-gray-300 italic">{ex.phrase}</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">→</span>
                <Badge variant="info">{ex.action}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}