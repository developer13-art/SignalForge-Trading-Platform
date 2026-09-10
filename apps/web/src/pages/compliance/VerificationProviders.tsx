import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

const providers = [
  { name: 'Sumsub', enabled: false },
  { name: 'Onfido', enabled: false },
  { name: 'Jumio', enabled: false },
  { name: 'Smile Identity', enabled: false },
];

export function VerificationProviders() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Verification Providers</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Configure KYC verification providers</p>
      </div>

      <Card>
        <div className="space-y-3">
          {providers.map((p) => (
            <div key={p.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <span className="text-sm font-medium text-gray-900 dark:text-white">{p.name}</span>
              <Badge variant={p.enabled ? 'success' : 'neutral'}>
                {p.enabled ? 'Enabled' : 'Not configured'}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}