import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Switch } from '../../components/ui/Switch';
import { Spinner } from '../../components/ui/Spinner';
import { ArrowLeftIcon, SourceIcon } from '../../components/ui/icons';
import { signalSourceService } from '../../services/signalSource.service';
import toast from 'react-hot-toast';

export function TelegramChannels() {
  const navigate = useNavigate();
  const [channels, setChannels] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    signalSourceService.getTelegramChannels()
      .then(setChannels)
      .finally(() => setIsLoading(false));
  }, []);

  const handleToggle = async (channelId: string, isMonitored: boolean) => {
    try {
      await signalSourceService.selectTelegramChannel(channelId, isMonitored);
      setChannels(prev => prev.map(c => c.id === channelId ? { ...c, isMonitored } : c));
      toast.success(isMonitored ? 'Channel monitored' : 'Channel unmonitored');
    } catch {
      toast.error('Failed to update');
    }
  };

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/signal-sources')} className="text-gray-400 hover:text-gray-600">
          <ArrowLeftIcon size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Telegram Channels</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Select which channels to monitor for signals
          </p>
        </div>
      </div>

      <Card>
        {channels.length > 0 ? (
          <div className="space-y-3">
            {channels.map((channel) => (
              <div key={channel.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center shrink-0">
                  <SourceIcon size={20} className="text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate">{channel.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{channel.type}</p>
                </div>
                <Switch
                  checked={channel.isMonitored}
                  onChange={(checked) => handleToggle(channel.id, checked)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <SourceIcon size={48} className="mx-auto mb-4 text-gray-400" />
            No channels discovered yet
          </div>
        )}
      </Card>
    </div>
  );
}