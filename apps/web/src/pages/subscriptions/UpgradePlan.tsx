import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { CheckIcon, ArrowLeftIcon } from '../../components/ui/icons';
import { subscriptionService, SubscriptionPlan } from '../../services/subscription.service';
import toast from 'react-hot-toast';

export function UpgradePlan() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    subscriptionService.getPlans().then(setPlans).finally(() => setIsLoading(false));
  }, []);

  const handleUpgrade = async (planId: string) => {
    setIsSubscribing(true);
    try {
      const result = await subscriptionService.subscribe(planId);
      window.location.href = result.authorizationUrl;
    } catch {
      toast.error('Failed to upgrade');
    } finally {
      setIsSubscribing(false);
    }
  };

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/subscriptions')} className="text-gray-400 hover:text-gray-600">
          <ArrowLeftIcon size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Upgrade Plan</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <Card key={plan.id}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
              ${plan.price}<span className="text-sm text-gray-500">/{plan.period.toLowerCase()}</span>
            </p>
            <Button onClick={() => handleUpgrade(plan.id)} isLoading={isSubscribing} className="w-full mt-4">
              Choose Plan
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}