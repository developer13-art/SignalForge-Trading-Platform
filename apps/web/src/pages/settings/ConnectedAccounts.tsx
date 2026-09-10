import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { SourceIcon, PlusIcon } from '../../components/ui/icons';

const providers = [
  { name: 'Telegram', connected: false },
  { name: 'Discord', connected: false },
  { name: 'Google', connected: false },
  { name: 'GitHub', connected: false },
];

export function ConnectedAccounts() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Connected Accounts</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Link external accounts for easier sign-in
        </p>
      </div>

      <div className="space-y-3">
        {providers.map((p) => (
          <Card key={p.name}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <SourceIcon size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{p.name}</p>
                  <Badge variant={p.connected ? 'success' : 'neutral'}>
                    {p.connected ? 'Connected' : 'Not connected'}
                  </Badge>
                </div>
              </div>
              <Button variant={p.connected ? 'outline' : 'primary'} size="sm">
                {p.connected ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}