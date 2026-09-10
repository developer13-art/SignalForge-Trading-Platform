import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Switch } from '../../components/ui/Switch';
import { Input } from '../../components/ui/Input';
import toast from 'react-hot-toast';

export function WhiteLabelSettings() {
  const handleSave = () => toast.success('Settings saved');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">White Label Settings</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Configure your platform settings
        </p>
      </div>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Platform Features</h3>
        <div className="space-y-4">
          <Switch checked={true} onChange={() => {}} label="Enable provider marketplace" />
          <Switch checked={true} onChange={() => {}} label="Enable trader marketplace" />
          <Switch checked={false} onChange={() => {}} label="Enable white label API" />
          <Switch checked={true} onChange={() => {}} label="Enable referral program" />
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Billing</h3>
        <div className="space-y-4">
          <Input label="Platform Fee (%)" type="number" placeholder="20" />
          <Input label="Payout Email" type="email" placeholder="payouts@yourbrand.com" />
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </div>
  );
}