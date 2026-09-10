import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { ArrowLeftIcon, PhoneIcon, ArrowRightIcon } from '../../components/ui/icons';
import { signalSourceService } from '../../services/signalSource.service';
import toast from 'react-hot-toast';

export function WhatsAppConnection() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    if (!name.trim()) {
      toast.error('Please enter a name');
      return;
    }
    setIsLoading(true);
    try {
      await signalSourceService.createSource({ name, sourceType: 'WHATSAPP' });
      toast.success('WhatsApp source created');
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Connect WhatsApp</h1>
        </div>
      </div>

      <Card>
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
            <PhoneIcon size={28} className="text-primary-600" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Connect via WhatsApp Business API to monitor groups for signals.
          </p>
        </div>

        <div className="space-y-4">
          <Input
            label="Source Name"
            placeholder="e.g., VIP WhatsApp Group"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={handleConnect} isLoading={isLoading} className="w-full">
            Create WhatsApp Source <ArrowRightIcon size={18} />
          </Button>
        </div>
      </Card>
    </div>
  );
}