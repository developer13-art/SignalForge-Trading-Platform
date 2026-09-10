import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Switch } from '../../components/ui/Switch';
import toast from 'react-hot-toast';

export function PrivacySettings() {
  const [prefs, setPrefs] = useState({
    showProfile: true,
    showStats: false,
    allowAnalytics: true,
  });

  const handleSave = () => toast.success('Privacy settings saved');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Privacy Settings</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Control your privacy preferences
        </p>
      </div>

      <Card>
        <div className="space-y-4">
          <Switch
            checked={prefs.showProfile}
            onChange={(checked) => setPrefs({ ...prefs, showProfile: checked })}
            label="Show my profile publicly"
          />
          <Switch
            checked={prefs.showStats}
            onChange={(checked) => setPrefs({ ...prefs, showStats: checked })}
            label="Show my trading statistics publicly"
          />
          <Switch
            checked={prefs.allowAnalytics}
            onChange={(checked) => setPrefs({ ...prefs, allowAnalytics: checked })}
            label="Allow anonymous usage analytics"
          />
        </div>
        <div className="flex justify-end mt-6">
          <Button onClick={handleSave}>Save</Button>
        </div>
      </Card>
    </div>
  );
}