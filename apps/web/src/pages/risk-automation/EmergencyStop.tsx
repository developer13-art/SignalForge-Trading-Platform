import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Switch } from '../../components/ui/Switch';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import { AlertIcon, StopIcon } from '../../components/ui/icons';
import { riskService, RiskProfile } from '../../services/risk.service';
import { ConfirmModal } from '../../components/modals/ConfirmModal';
import toast from 'react-hot-toast';

export function EmergencyStop() {
  const [profile, setProfile] = useState<RiskProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    riskService.getProfile().then(setProfile).finally(() => setIsLoading(false));
  }, []);

  const handleSave = async () => {
    if (!profile) return;
    setIsSaving(true);
    try {
      await riskService.updateProfile(profile);
      toast.success('Emergency stop updated');
    } catch {
      toast.error('Failed to update');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEmergencyStop = async () => {
    try {
      await riskService.updateProfile({ ...profile, emergencyStop: true } as any);
      setShowConfirm(false);
      toast.success('Emergency stop activated');
      setProfile({ ...profile, emergencyStop: true } as any);
    } catch {
      toast.error('Failed to activate emergency stop');
    }
  };

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;
  if (!profile) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Emergency Stop</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Instantly disable all trading automation
        </p>
      </div>

      <Card>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center shrink-0">
            <AlertIcon size={24} className="text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">Emergency Stop</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              When activated, all automated trading will be paused until manually re-enabled.
            </p>
          </div>
        </div>

        <Switch
          checked={!profile.emergencyStop}
          onChange={(checked) => setProfile({ ...profile, emergencyStop: !checked })}
          label={profile.emergencyStop ? 'Trading is currently DISABLED' : 'Trading is currently ENABLED'}
          description="Toggle off to trigger emergency stop"
        />

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button variant="danger" onClick={() => setShowConfirm(true)} className="w-full">
            <StopIcon size={18} />
            Activate Emergency Stop
          </Button>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} isLoading={isSaving}>Save Changes</Button>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleEmergencyStop}
        title="Activate Emergency Stop"
        message="This will immediately disable all automated trading. Are you sure?"
        confirmLabel="Yes, Stop Trading"
      />
    </div>
  );
}