import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import {
  SourceIcon, ArrowLeftIcon, ArrowRightIcon,
  SignalIcon, MailIcon, MonitorIcon,
} from '../../components/ui/icons';
import { signalSourceService } from '../../services/signalSource.service';
import toast from 'react-hot-toast';

const sourceTypes = [
  { value: 'TELEGRAM', label: 'Telegram', description: 'Connect via user session', icon: SourceIcon, route: '/signal-sources/telegram/connect' },
  { value: 'DISCORD', label: 'Discord', description: 'OAuth connection', icon: SignalIcon, route: '/signal-sources/discord/connect' },
  { value: 'WHATSAPP', label: 'WhatsApp', description: 'Business API', icon: SignalIcon, route: '/signal-sources/whatsapp/connect' },
  { value: 'TRADINGVIEW', label: 'TradingView', description: 'Webhook integration', icon: MonitorIcon, route: '/signal-sources/tradingview' },
  { value: 'REST_API', label: 'REST API', description: 'Direct provider integration', icon: MonitorIcon, route: '/signal-sources/rest-api' },
  { value: 'EMAIL', label: 'Email', description: 'IMAP/SMTP integration', icon: MailIcon, route: '/signal-sources/email' },
];

export function AddSignalSource() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'select' | 'configure'>('select');
  const [selectedType, setSelectedType] = useState<string>('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = (type: string, route: string) => {
    setSelectedType(type);
    if (type === 'TELEGRAM') {
      navigate(route);
      return;
    }
    setStep('configure');
  };

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error('Please enter a name');
      return;
    }
    setIsLoading(true);
    try {
      await signalSourceService.createSource({ name, sourceType: selectedType });
      toast.success('Signal source created');
      navigate('/signal-sources');
    } catch (error: any) {
      toast.error(error?.response?.data?.error?.message || 'Failed to create');
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'select') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/signal-sources')} className="text-gray-400 hover:text-gray-600">
            <ArrowLeftIcon size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add Signal Source</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Choose the type of source to connect
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sourceTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card key={type.value} hoverable onClick={() => handleSelect(type.value, type.route)}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{type.label}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{type.description}</p>
                  </div>
                  <ArrowRightIcon size={16} className="text-gray-400 shrink-0" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => setStep('select')} className="text-gray-400 hover:text-gray-600">
          <ArrowLeftIcon size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Configure {sourceTypes.find(t => t.value === selectedType)?.label}
          </h1>
        </div>
      </div>

      <Card>
        <div className="space-y-4">
          <Input
            label="Source Name"
            placeholder="e.g., My VIP Channel"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="flex justify-end">
            <Button onClick={handleCreate} isLoading={isLoading}>
              Create Source <ArrowRightIcon size={18} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}