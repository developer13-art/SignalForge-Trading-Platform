import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CheckIcon, AlertIcon } from '../../components/ui/icons';

export function ConnectionStatus() {
  const statuses = [
    { label: 'Deployment', status: 'Ready', variant: 'success' as const },
    { label: 'Login', status: 'Connected', variant: 'success' as const },
    { label: 'Terminal', status: 'Online', variant: 'success' as const },
    { label: 'Streaming', status: 'Active', variant: 'success' as const },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Connection Status</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Real-time connection health
        </p>
      </div>

      <Card>
        <div className="space-y-4">
          {statuses.map((s) => (
            <div key={s.label} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckIcon size={16} className="text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{s.label}</span>
              </div>
              <Badge variant={s.variant}>{s.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}