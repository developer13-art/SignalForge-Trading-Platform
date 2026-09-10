import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import toast from 'react-hot-toast';

export function SecuritySettings() {
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (passwords.newPass !== passwords.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    setIsSaving(true);
    try {
      await new Promise(r => setTimeout(r, 500));
      toast.success('Password changed');
      setPasswords({ current: '', newPass: '', confirm: '' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Security Settings</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your account security
        </p>
      </div>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Change Password</h3>
        <div className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            value={passwords.current}
            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
          />
          <Input
            label="New Password"
            type="password"
            value={passwords.newPass}
            onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={passwords.confirm}
            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
          />
        </div>
        <div className="flex justify-end mt-6">
          <Button onClick={handleSave} isLoading={isSaving}>Update Password</Button>
        </div>
      </Card>
    </div>
  );
}