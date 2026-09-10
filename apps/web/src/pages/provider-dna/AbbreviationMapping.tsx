import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { KycIcon } from '../../components/ui/icons';

const examples = [
  { abbr: 'BE', meaning: 'Break Even' },
  { abbr: 'SL', meaning: 'Stop Loss' },
  { abbr: 'TP', meaning: 'Take Profit' },
  { abbr: 'SP', meaning: 'Secure Profit' },
  { abbr: 'EP', meaning: 'Entry Price' },
];

export function AbbreviationMapping() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Abbreviation Mapping</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Provider-specific abbreviations and their meanings
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<KycIcon size={32} className="text-gray-400" />}
          title="No Abbreviations Learned"
          description="Abbreviations are learned from provider messages automatically."
        />
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Common Abbreviations</h3>
        <div className="space-y-2">
          {examples.map((ex) => (
            <div key={ex.abbr} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <span className="text-sm font-mono text-gray-700 dark:text-gray-300">"{ex.abbr}"</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">→</span>
                <Badge variant="primary">{ex.meaning}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}