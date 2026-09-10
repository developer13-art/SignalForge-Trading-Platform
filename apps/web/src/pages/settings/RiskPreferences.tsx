import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import toast from 'react-hot-toast';

export function RiskPreferences() {
  const [prefs, setPrefs] = useState({
    riskPercent: 1,
    maxDailyLoss: 3,
    maxDrawdown: 10,
    maxOpenTrades: 5,
  });

  const handleSave = () => toast.success('Risk preferences saved');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Risk Preferences</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Set your default risk limits
        </p>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Risk per Trade (%)"
            type="number"
            value={prefs.riskPercent}
            onChange={(e) => setPrefs({ ...prefs, riskPercent: parseFloat(e.target.value) || 0 })}
          />
          <Input
            label="Max Daily Loss (%)"
            type="number"
            value={prefs.maxDailyLoss}
            onChange={(e) => setPrefs({ ...prefs, maxDailyLoss: parseFloat(e.target.value) || 0 })}
          />
          <Input
            label="Max Drawdown (%)"
            type="number"
            value={prefs.maxDrawdown}
            onChange={(e) => setPrefs({ ...prefs, maxDrawdown: parseFloat(e.target.value) || 0 })}
          />
          <Input
            label="Max Open Trades"
            type="number"
            value={prefs.maxOpenTrades}
            onChange={(e) => setPrefs({ ...prefs, maxOpenTrades: parseInt(e.target.value) || 1 })}
          />
        </div>
        <div className="flex justify-end mt-6">
          <Button onClick={handleSave}>Save</Button>
        </div>
      </Card>
    </div>
  );
}