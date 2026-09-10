import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Progress } from '../../components/ui/Progress';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import { ShieldIcon } from '../../components/ui/icons';
import { riskService, RiskProfile } from '../../services/risk.service';
import toast from 'react-hot-toast';

export function DrawdownProtection() {
  const [profile, setProfile] = useState<RiskProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    riskService.getProfile().then(setProfile).finally(() => setIsLoading(false));
  }, []);

  const handleSave = async () => {
    if (!profile) return;
    setIsSaving(true);
    try {
      await riskService.updateProfile(profile);
      toast.success('Drawdown protection updated');
    } catch {
      toast.error('Failed to update');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;
  if (!profile) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Drawdown Protection</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Cap your maximum total loss from peak equity
        </p>
      </div>

      <Card>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center shrink-0">
            <ShieldIcon size={24} className="text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Current Drawdown</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              0% of {profile.maxDrawdown}% limit
            </p>
          </div>
        </div>

        <Progress value={0} max={100} variant="success" showLabel />

        <div className="mt-6">
          <Input
            label="Max Drawdown (%)"
            type="number"
            value={profile.maxDrawdown}
            onChange={(e) => setProfile({ ...profile, maxDrawdown: parseFloat(e.target.value) || 0 })}
            helperText="All trading stops if drawdown reaches this percentage from peak"
          />
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} isLoading={isSaving}>Save Changes</Button>
      </div>
    </div>
  );
}