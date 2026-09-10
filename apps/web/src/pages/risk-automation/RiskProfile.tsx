import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Switch } from '../../components/ui/Switch';
import { Spinner } from '../../components/ui/Spinner';
import { riskService, RiskProfile as RiskProfileType } from '../../services/risk.service';
import toast from 'react-hot-toast';

export function RiskProfile() {
  const [profile, setProfile] = useState<RiskProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    riskService.getProfile().then(setProfile).finally(() => setIsLoading(false));
  }, []);

  const handleChange = (key: keyof RiskProfileType, value: any) => {
    if (!profile) return;
    setProfile({ ...profile, [key]: value });
  };

  const handleSave = async () => {
    if (!profile) return;
    setIsSaving(true);
    try {
      await riskService.updateProfile(profile);
      toast.success('Risk profile updated');
    } catch (error: any) {
      toast.error(error?.response?.data?.error?.message || 'Failed to update');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;
  if (!profile) return null;

  const toggles: Array<{ key: keyof RiskProfileType; label: string; description: string }> = [
    { key: 'trailingStop', label: 'Trailing Stop', description: 'Automatically trail stop loss as price moves in your favor' },
    { key: 'breakEven', label: 'Break Even', description: 'Move SL to entry when profit reaches threshold' },
    { key: 'profitLock', label: 'Profit Lock', description: 'Lock in partial profits automatically' },
    { key: 'partialClose', label: 'Partial Close', description: 'Close a percentage of position at targets' },
    { key: 'correlationProtection', label: 'Correlation Protection', description: 'Prevent correlated position stacking' },
    { key: 'newsFilter', label: 'News Filter', description: 'Avoid trading during high-impact news events' },
    { key: 'emergencyStop', label: 'Emergency Stop', description: 'Instantly disable automation when triggered' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Risk Profile</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Configure how much risk each trade can take
        </p>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Core Limits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Risk Percent per Trade (%)"
            type="number"
            value={profile.riskPercent}
            onChange={(e) => handleChange('riskPercent', parseFloat(e.target.value) || 0)}
            helperText="Percent of account to risk on each trade"
          />
          <Input
            label="Max Daily Loss (%)"
            type="number"
            value={profile.maxDailyLoss}
            onChange={(e) => handleChange('maxDailyLoss', parseFloat(e.target.value) || 0)}
            helperText="Stop trading for the day if this is reached"
          />
          <Input
            label="Max Drawdown (%)"
            type="number"
            value={profile.maxDrawdown}
            onChange={(e) => handleChange('maxDrawdown', parseFloat(e.target.value) || 0)}
            helperText="Total allowed loss from peak equity"
          />
          <Input
            label="Max Open Trades"
            type="number"
            value={profile.maxOpenTrades}
            onChange={(e) => handleChange('maxOpenTrades', parseInt(e.target.value) || 1)}
            helperText="Maximum concurrent positions allowed"
          />
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Automation Protections</h3>
        <div className="space-y-4">
          {toggles.map((t) => (
            <Switch
              key={t.key}
              checked={Boolean((profile as any)[t.key])}
              onChange={(checked) => handleChange(t.key, checked)}
              label={t.label}
              description={t.description}
            />
          ))}
        </div>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Cancel
        </Button>
        <Button onClick={handleSave} isLoading={isSaving}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}