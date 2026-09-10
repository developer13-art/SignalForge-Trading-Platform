import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { ArrowLeftIcon, CopyIcon, MonitorIcon, ArrowRightIcon } from '../../components/ui/icons';
import { signalSourceService } from '../../services/signalSource.service';
import toast from 'react-hot-toast';

export function TradingViewWebhooks() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Webhook URL would come from API after creating source
  const webhookUrl = `https://api.signalforge.ai/webhooks/tradingview/YOUR_SOURCE_ID`;

  const copyUrl = () => {
    navigator.clipboard.writeText(webhookUrl);
    toast.success('Webhook URL copied');
  };

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error('Please enter a name');
      return;
    }
    setIsLoading(true);
    try {
      await signalSourceService.createSource({ name, sourceType: 'TRADINGVIEW' });
      toast.success('TradingView webhook created');
      navigate('/signal-sources');
    } catch (error: any) {
      toast.error(error?.response?.data?.error?.message || 'Failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/signal-sources/add')} className="text-gray-400 hover:text-gray-600">
          <ArrowLeftIcon size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">TradingView Webhook</h1>
        </div>
      </div>

      <Card>
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
            <MonitorIcon size={28} className="text-primary-600" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Create a webhook endpoint to receive TradingView alerts.
          </p>
        </div>

        <div className="space-y-4">
          <Input label="Source Name" placeholder="e.g., My Strategy Alerts" value={name} onChange={(e) => setName(e.target.value)} />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Webhook URL
            </label>
            <div className="flex gap-2">
              <input type="text" readOnly value={webhookUrl} className="flex-1 input-field font-mono text-xs" />
              <Button variant="outline" size="sm" onClick={copyUrl}>
                <CopyIcon size={16} />
              </Button>
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Paste this URL in your TradingView alert settings.
            </p>
          </div>

          <Button onClick={handleCreate} isLoading={isLoading} className="w-full">
            Create Source <ArrowRightIcon size={18} />
          </Button>
        </div>
      </Card>
    </div>
  );
}