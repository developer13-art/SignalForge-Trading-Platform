import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Switch } from '../../components/ui/Switch';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import { AnalyticsIcon } from '../../components/ui/icons';
import { riskService, RiskProfile } from '../../services/risk.service';
import toast from 'react-hot-toast';

export function PartialClose() {
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
      toast.success('Partial close settings updated');
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Partial Close</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Take partial profits at TP1 and let the rest run
        </p>
      </div>

      <Card>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center shrink-0">
            <AnalyticsIcon size={24} className="text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">Partial Close</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              When enabled, a portion of the trade is closed when TP1 is reached.
            </p>
          </div>
        </div>

        <Switch
          checked={profile.partialClose}
          onChange={(checked) => setProfile({ ...profile, partialClose: checked })}
          label="Enable Partial Close"
          description="Reduces risk while keeping upside potential"
        />
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} isLoading={isSaving}>Save Changes</Button>
      </div>
    </div>
  );
}