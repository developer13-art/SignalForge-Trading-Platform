import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { SignalIcon } from '../../components/ui/icons';

const exampleMappings = [
  { provider: 'Gold', normalized: 'XAUUSD' },
  { provider: 'Silver', normalized: 'XAGUSD' },
  { provider: 'Euro', normalized: 'EURUSD' },
  { provider: 'Cable', normalized: 'GBPUSD' },
  { provider: 'Fiber', normalized: 'EURUSD' },
  { provider: 'Aussie', normalized: 'AUDUSD' },
  { provider: 'UJ', normalized: 'USDJPY' },
];

export function SymbolMapping() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Symbol Mapping</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          How provider-specific symbols are normalized
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<SignalIcon size={32} className="text-gray-400" />}
          title="No Symbol Mappings"
          description="Symbol mappings are learned automatically as providers send signals."
        />
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Common Provider Symbols</h3>
        <div className="space-y-2">
          {exampleMappings.map((m) => (
            <div key={m.provider} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <span className="text-sm font-mono text-gray-700 dark:text-gray-300">"{m.provider}"</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">→</span>
                <Badge variant="primary">{m.normalized}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}