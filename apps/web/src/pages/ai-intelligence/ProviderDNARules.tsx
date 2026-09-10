import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { KycIcon } from '../../components/ui/icons';

export function ProviderDNARules() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Provider DNA Rules</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Learned abbreviation and pattern mappings
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<KycIcon size={32} className="text-gray-400" />}
          title="No Rules Yet"
          description="Provider DNA rules will appear here as they are learned from incoming messages."
        />
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Example Rules</h3>
        <div className="space-y-2">
          {[
            { pattern: '"Secure Profit"', action: 'Move SL to Break Even' },
            { pattern: '"Close Some"', action: 'Partial Close 50%' },
            { pattern: '"BE"', action: 'Break Even' },
            { pattern: '"TP1 Hit"', action: 'Take Profit 1 Reached' },
            { pattern: '"Trail"', action: 'Enable Trailing Stop' },
          ].map((rule, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <span className="text-sm font-mono text-gray-700 dark:text-gray-300">{rule.pattern}</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">→</span>
                <Badge variant="primary">{rule.action}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}