import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { PlusIcon, TrashIcon, CopyIcon } from '../../components/ui/icons';
import toast from 'react-hot-toast';

export function APIKeys() {
  const [keys] = useState<any[]>([]);

  const handleCreate = () => {
    toast.success('API key created');
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success('Key copied');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">API Keys</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your API access keys
          </p>
        </div>
        <Button onClick={handleCreate}>
          <PlusIcon size={18} /> New API Key
        </Button>
      </div>

      <Card>
        {keys.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>No API keys yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {keys.map((k) => (
              <div key={k.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div>
                  <p className="font-mono text-sm text-gray-900 dark:text-white">{k.prefix}...</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Created {new Date(k.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success">Active</Badge>
                  <Button variant="ghost" size="sm" onClick={() => copyKey(k.key)}>
                    <CopyIcon size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <TrashIcon size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}