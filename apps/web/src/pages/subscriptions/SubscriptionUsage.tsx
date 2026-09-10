import React from 'react';
import { Card } from '../../components/ui/Card';
import { Progress } from '../../components/ui/Progress';

export function SubscriptionUsage() {
  const usage = [
    { label: 'Signal Sources', used: 0, max: 10 },
    { label: 'Broker Accounts', used: 0, max: 3 },
    { label: 'AI Calls', used: 0, max: 1000 },
    { label: 'API Requests', used: 0, max: 10000 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Subscription Usage</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Your usage against plan limits
        </p>
      </div>

      <Card>
        <div className="space-y-4">
          {usage.map((u) => (
            <div key={u.label}>
              <div className="flex justify-between mb-2 text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-300">{u.label}</span>
                <span className="text-gray-500 dark:text-gray-400">{u.used} / {u.max}</span>
              </div>
              <Progress value={u.used} max={u.max} variant={u.used / u.max > 0.8 ? 'warning' : 'primary'} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}