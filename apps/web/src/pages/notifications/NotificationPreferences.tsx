import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Switch } from '../../components/ui/Switch';
import toast from 'react-hot-toast';

export function NotificationPreferences() {
  const [prefs, setPrefs] = useState({
    tradeEmail: true,
    tradeInApp: true,
    signalEmail: true,
    signalInApp: true,
    kycEmail: true,
    kycInApp: true,
    referralEmail: false,
    referralInApp: true,
    paymentEmail: true,
    paymentInApp: true,
    securityEmail: true,
    securityInApp: true,
    systemEmail: false,
    systemInApp: true,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(r => setTimeout(r, 500));
      toast.success('Preferences saved');
    } finally {
      setIsSaving(false);
    }
  };

  const sections = [
    { key: 'trade', label: 'Trade Notifications' },
    { key: 'signal', label: 'Signal Notifications' },
    { key: 'kyc', label: 'KYC Notifications' },
    { key: 'referral', label: 'Referral Notifications' },
    { key: 'payment', label: 'Payment Notifications' },
    { key: 'security', label: 'Security Notifications' },
    { key: 'system', label: 'System Notifications' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notification Preferences</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Control how and when you receive notifications
        </p>
      </div>

      <Card>
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.key} className="border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">{section.label}</h3>
              <div className="space-y-2">
                <Switch
                  checked={(prefs as any)[`${section.key}Email`]}
                  onChange={(checked) => setPrefs({ ...prefs, [`${section.key}Email`]: checked })}
                  label="Email"
                />
                <Switch
                  checked={(prefs as any)[`${section.key}InApp`]}
                  onChange={(checked) => setPrefs({ ...prefs, [`${section.key}InApp`]: checked })}
                  label="In-App"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSave} isLoading={isSaving}>Save Preferences</Button>
        </div>
      </Card>
    </div>
  );
}