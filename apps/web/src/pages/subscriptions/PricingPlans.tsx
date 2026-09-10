import React, { useEffect } from 'react';
import { useSubscriptionStore } from '../../stores/subscription.store';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { CheckIcon, ArrowRightIcon } from '../../components/ui/icons';
import { useAuthStore } from '../../stores/auth.store';
import toast from 'react-hot-toast';

export function PricingPlans() {
  const { plans, fetchPlans, subscribe, isLoading } = useSubscriptionStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handleSubscribe = async (planId: string, planName: string) => {
    if (user?.kycStatus !== 'VERIFIED') {
      toast.error('Please complete KYC verification before subscribing');
      return;
    }

    const authorizationUrl = await subscribe(planId);
    if (authorizationUrl) {
      window.location.href = authorizationUrl;
    } else {
      toast.error(`Failed to initialize payment for ${planName}`);
    }
  };

  const periodLabels: Record<string, string> = {
    MONTHLY: '/month',
    YEARLY: '/year',
    LIFETIME: 'one-time',
    ENTERPRISE: 'custom',
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Choose Your Plan</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Unlock the full power of SignalForge AI
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => {
          const features = (plan.features as string[]) || [];
          const isPopular = plan.name.toLowerCase().includes('yearly');

          return (
            <Card
              key={plan.id}
              className={isPopular ? 'ring-2 ring-primary-500 relative' : ''}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="primary">Most Popular</Badge>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                {plan.description && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{plan.description}</p>
                )}
                <div className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                    ${plan.price}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {periodLabels[plan.period] || ''}
                  </span>
                </div>
              </div>

              {features.length > 0 && (
                <ul className="space-y-3 mb-6">
                  {features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckIcon size={18} className="text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              <Button
                onClick={() => handleSubscribe(plan.id, plan.name)}
                isLoading={isLoading}
                variant={isPopular ? 'primary' : 'outline'}
                className="w-full"
              >
                Get Started
                <ArrowRightIcon size={18} />
              </Button>
            </Card>
          );
        })}
      </div>

      {plans.length === 0 && !isLoading && (
        <Card>
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No subscription plans available at this time.
          </div>
        </Card>
      )}
    </div>
  );
}