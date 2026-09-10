import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ShieldIcon } from '../../components/ui/icons';
import toast from 'react-hot-toast';

export function TwoFactorSettings() {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = () => {
    setEnabled(!enabled);
    toast.success(enabled ? '2FA disabled' : '2FA enabled');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Two-Factor Authentication</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Add an extra layer of security
        </p>
      </div>

      <Card>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center shrink-0">
            <ShieldIcon size={24} className="text-primary-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</h3>
              <Badge variant={enabled ? 'success' : 'neutral'}>{enabled ? 'Enabled' : 'Disabled'}</Badge>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Protect your account with TOTP authentication
            </p>
          </div>
        </div>

        <Button onClick={handleToggle}>
          {enabled ? 'Disable 2FA' : 'Enable 2FA'}
        </Button>
      </Card>
    </div>
  );
}