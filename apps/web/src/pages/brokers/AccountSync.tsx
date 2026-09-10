import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { RefreshIcon } from '../../components/ui/icons';
import toast from 'react-hot-toast';

export function AccountSync() {
  const handleSync = () => {
    toast.success('Sync initiated');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Sync</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manually synchronize account state with MetaApi
        </p>
      </div>

      <Card>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          SignalForge syncs your account automatically. Use this page to force a sync if needed.
        </p>
        <Button onClick={handleSync}>
          <RefreshIcon size={18} />
          Sync Now
        </Button>
      </Card>
    </div>
  );
}