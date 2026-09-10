import React from 'react';
import { Card } from '../../components/ui/Card';
import { Switch } from '../../components/ui/Switch';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';

export function UserRestrictions() {
  const handleSave = () => toast.success('Restrictions saved');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Restrictions</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Apply platform-wide restrictions</p>
      </div>

      <Card>
        <div className="space-y-4">
          <Switch checked={false} onChange={() => {}} label="Disable Trading" description="Prevent user from executing new trades" />
          <Switch checked={false} onChange={() => {}} label="Disable Withdrawals" description="Block all withdrawal requests" />
          <Switch checked={false} onChange={() => {}} label="Force 2FA" description="Require 2FA on next login" />
          <Switch checked={false} onChange={() => {}} label="Restrict API" description="Disable API key usage" />
        </div>
        <div className="flex justify-end mt-6">
          <Button onClick={handleSave}>Save Restrictions</Button>
        </div>
      </Card>
    </div>
  );
}