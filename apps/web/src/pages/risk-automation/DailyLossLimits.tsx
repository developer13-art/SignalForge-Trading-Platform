import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Progress } from '../../components/ui/Progress';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import { AlertIcon } from '../../components/ui/icons';
import { riskService, RiskProfile } from '../../services/risk.service';
import toast from 'react-hot-toast';

export function DailyLossLimits() {
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
      toast.success('Daily loss limit updated');
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Daily Loss Limits</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Automatically stop trading when daily loss threshold is reached
        </p>
      </div>

      <Card>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center shrink-0">
            <AlertIcon size={24} className="text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Today's Progress</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              $0.00 lost out of ${profile.maxDailyLoss}% limit
            </p>
          </div>
        </div>

        <Progress value={0} max={100} variant="success" showLabel />

        <div className="mt-6">
          <Input
            label="Max Daily Loss (%)"
            type="number"
            value={profile.maxDailyLoss}
            onChange={(e) => setProfile({ ...profile, maxDailyLoss: parseFloat(e.target.value) || 0 })}
            helperText="Trading will automatically pause when this limit is hit"
          />
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} isLoading={isSaving}>Save Changes</Button>
      </div>
    </div>
  );
}