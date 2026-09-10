import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Switch } from '../../components/ui/Switch';
import { ArrowLeftIcon } from '../../components/ui/icons';
import toast from 'react-hot-toast';

export function CopyTradingSettings() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    enabled: false,
    riskPercent: 1,
    maxLotSize: 1,
    copyExisting: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save copy trading settings
      await new Promise(r => setTimeout(r, 500));
      toast.success('Copy trading settings saved');
      navigate('/marketplace/traders/my-followed');
    } catch {
      toast.error('Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600">
          <ArrowLeftIcon size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Copy Trading Settings</h1>
      </div>

      <Card>
        <div className="space-y-6">
          <Switch
            checked={settings.enabled}
            onChange={(checked) => setSettings({ ...settings, enabled: checked })}
            label="Enable Copy Trading"
            description="Mirror this trader's trades on your account"
          />

          {settings.enabled && (
            <>
              <Input
                label="Risk Percent per Trade (%)"
                type="number"
                value={settings.riskPercent}
                onChange={(e) => setSettings({ ...settings, riskPercent: parseFloat(e.target.value) || 0 })}
                helperText="Percentage of your account to risk per trade"
              />

              <Input
                label="Max Lot Size"
                type="number"
                value={settings.maxLotSize}
                onChange={(e) => setSettings({ ...settings, maxLotSize: parseFloat(e.target.value) || 0 })}
                helperText="Maximum lot size cap regardless of the trader's size"
              />

              <Switch
                checked={settings.copyExisting}
                onChange={(checked) => setSettings({ ...settings, copyExisting: checked })}
                label="Copy Existing Open Positions"
                description="Immediately open matching positions for the trader's currently open trades"
              />
            </>
          )}

          <Button onClick={handleSave} isLoading={isSaving} className="w-full">
            Save Settings
          </Button>
        </div>
      </Card>
    </div>
  );
}