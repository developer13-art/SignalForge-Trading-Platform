import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { CheckIcon, ArrowLeftIcon } from '../../components/ui/icons';
import { marketplaceService } from '../../services/marketplace.service';
import toast from 'react-hot-toast';

export function SubscribeToProvider() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [plan, setPlan] = useState('pro');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      await marketplaceService.subscribe(id, plan);
      toast.success('Subscribed successfully');
      navigate('/marketplace/my-providers');
    } catch (error: any) {
      toast.error(error?.response?.data?.error?.message || 'Failed to subscribe');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600">
          <ArrowLeftIcon size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Subscribe to Provider</h1>
      </div>

      <Card>
        <div className="space-y-4">
          <Select
            label="Select Plan"
            options={[
              { value: 'basic', label: 'Basic - $29/month' },
              { value: 'pro', label: 'Pro - $79/month' },
              { value: 'elite', label: 'Elite - $199/month' },
            ]}
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
          />

          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">What you'll get</p>
            <ul className="space-y-1">
              <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <CheckIcon size={14} className="text-green-500 mt-0.5 shrink-0" />
                Automatic trade execution
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <CheckIcon size={14} className="text-green-500 mt-0.5 shrink-0" />
                Real-time signal delivery
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <CheckIcon size={14} className="text-green-500 mt-0.5 shrink-0" />
                Full trade history and analytics
              </li>
            </ul>
          </div>

          <Button onClick={handleSubscribe} isLoading={isLoading} className="w-full">
            Confirm Subscription
          </Button>
        </div>
      </Card>
    </div>
  );
}