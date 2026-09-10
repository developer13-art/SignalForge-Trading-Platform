import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Progress } from '../../components/ui/Progress';

export function AccountHealth() {
  const healthItems = [
    { label: 'Broker Connection', status: 'Not Connected', variant: 'neutral' as const },
    { label: 'KYC Verification', status: 'Pending', variant: 'warning' as const },
    { label: 'Subscription', status: 'None', variant: 'neutral' as const },
    { label: 'Signal Sources', status: '0 Connected', variant: 'neutral' as const },
    { label: 'Automation', status: 'Disabled', variant: 'neutral' as const },
    { label: 'Risk Engine', status: 'Ready', variant: 'success' as const },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Health</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Overall status of your SignalForge account
        </p>
      </div>

      <Card>
        <div className="text-center py-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">Overall Health Score</p>
          <p className="text-5xl font-extrabold text-primary-600 mt-2">60%</p>
          <Progress value={60} max={100} className="mt-4 max-w-md mx-auto" />
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Health Checklist</h3>
        <div className="space-y-3">
          {healthItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
              <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
              <Badge variant={item.variant}>{item.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}