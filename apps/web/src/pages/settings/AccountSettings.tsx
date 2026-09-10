import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import toast from 'react-hot-toast';

export function AccountSettings() {
  const handleSave = () => toast.success('Account settings saved');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your account preferences
        </p>
      </div>

      <Card>
        <div className="space-y-4">
          <Input label="Username" placeholder="your_username" />
          <Input label="Country" placeholder="Select country" />
          <Input label="Timezone" placeholder="UTC" />
        </div>
        <div className="flex justify-end mt-6">
          <Button onClick={handleSave}>Save</Button>
        </div>
      </Card>
    </div>
  );
}