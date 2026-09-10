import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Switch } from '../../components/ui/Switch';
import toast from 'react-hot-toast';

export function SystemSettings() {
  const [settings, setSettings] = useState({
    kycRequiredForSubscription: true,
    kycRequiredForTrading: true,
    kycRequiredForReferral: true,
    referralRewardRate: 0.001,
    maintenanceMode: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(r => setTimeout(r, 500));
      toast.success('System settings saved');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Settings</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Configure platform settings</p>
      </div>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">KYC Requirements</h3>
        <div className="space-y-4">
          <Switch
            checked={settings.kycRequiredForSubscription}
            onChange={(checked) => setSettings({ ...settings, kycRequiredForSubscription: checked })}
            label="KYC required for subscription"
          />
          <Switch
            checked={settings.kycRequiredForTrading}
            onChange={(checked) => setSettings({ ...settings, kycRequiredForTrading: checked })}
            label="KYC required for trading"
          />
          <Switch
            checked={settings.kycRequiredForReferral}
            onChange={(checked) => setSettings({ ...settings, kycRequiredForReferral: checked })}
            label="KYC required for referrals"
          />
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Referral Program</h3>
        <Input
          label="Reward Rate (decimal)"
          type="number"
          step="0.0001"
          value={settings.referralRewardRate}
          onChange={(e) => setSettings({ ...settings, referralRewardRate: parseFloat(e.target.value) || 0 })}
        />
      </Card>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Platform</h3>
        <Switch
          checked={settings.maintenanceMode}
          onChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
          label="Maintenance Mode"
          description="Prevents users from accessing the platform"
        />
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} isLoading={isSaving}>Save Settings</Button>
      </div>
    </div>
  );
}