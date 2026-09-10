import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { Switch } from '../../components/ui/Switch';
import toast from 'react-hot-toast';

export function TradingPreferences() {
  const [prefs, setPrefs] = useState({
    defaultAccount: '',
    defaultRisk: '1',
    autoExecute: false,
    notifyOnExecution: true,
  });

  const handleSave = () => toast.success('Trading preferences saved');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trading Preferences</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Configure how your trades execute
        </p>
      </div>

      <Card>
        <div className="space-y-4">
          <Select
            label="Default Broker Account"
            options={[{ value: 'none', label: 'Not set' }]}
            value={prefs.defaultAccount}
            onChange={(e) => setPrefs({ ...prefs, defaultAccount: e.target.value })}
          />
          <Select
            label="Default Risk Percent"
            options={[
              { value: '0.5', label: '0.5%' },
              { value: '1', label: '1%' },
              { value: '2', label: '2%' },
              { value: '3', label: '3%' },
            ]}
            value={prefs.defaultRisk}
            onChange={(e) => setPrefs({ ...prefs, defaultRisk: e.target.value })}
          />
          <Switch
            checked={prefs.autoExecute}
            onChange={(checked) => setPrefs({ ...prefs, autoExecute: checked })}
            label="Auto-Execute Signals"
            description="Automatically execute signals that pass risk checks"
          />
          <Switch
            checked={prefs.notifyOnExecution}
            onChange={(checked) => setPrefs({ ...prefs, notifyOnExecution: checked })}
            label="Notify on Execution"
          />
        </div>
        <div className="flex justify-end mt-6">
          <Button onClick={handleSave}>Save Preferences</Button>
        </div>
      </Card>
    </div>
  );
}