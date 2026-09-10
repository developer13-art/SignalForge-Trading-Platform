import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Switch } from '../../components/ui/Switch';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import { RiskIcon } from '../../components/ui/icons';
import { riskService, RiskProfile } from '../../services/risk.service';
import toast from 'react-hot-toast';

export function CorrelationProtection() {
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
      toast.success('Correlation protection updated');
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Correlation Protection</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Prevent correlated positions from concentrating risk
        </p>
      </div>

      <Card>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center shrink-0">
            <RiskIcon size={24} className="text-yellow-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">Correlation Protection</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Prevents you from opening too many positions that move together (e.g. EURUSD + GBPUSD).
            </p>
          </div>
        </div>

        <Switch
          checked={profile.correlationProtection}
          onChange={(checked) => setProfile({ ...profile, correlationProtection: checked })}
          label="Enable Correlation Protection"
          description="Recommended for risk management"
        />
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} isLoading={isSaving}>Save Changes</Button>
      </div>
    </div>
  );
}