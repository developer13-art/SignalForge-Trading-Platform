import React from 'react';
import { Card } from '../../components/ui/Card';
import { Switch } from '../../components/ui/Switch';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import toast from 'react-hot-toast';

export function ProviderSettings() {
  const handleSave = () => toast.success('Settings saved');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Provider Settings</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Configure your provider preferences
        </p>
      </div>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Notifications</h3>
        <div className="space-y-4">
          <Switch checked={true} onChange={() => {}} label="Email me on new subscribers" />
          <Switch checked={true} onChange={() => {}} label="Email me on new reviews" />
          <Switch checked={false} onChange={() => {}} label="SMS notifications" />
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Payout Preferences</h3>
        <div className="space-y-4">
          <Input label="Minimum Payout Amount" type="number" placeholder="100" />
          <Input label="Payout Method" placeholder="Bank Transfer" />
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </div>
  );
}