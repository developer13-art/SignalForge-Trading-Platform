import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { CheckIcon } from '../../components/ui/icons';

const plans = [
  { name: 'Basic', price: 29, features: ['All signals', 'Basic analytics', 'Email support'] },
  { name: 'Pro', price: 79, features: ['All signals', 'Advanced analytics', 'Priority support', 'Copy trading'], popular: true },
  { name: 'Elite', price: 199, features: ['All signals', 'Full analytics', '24/7 support', 'Copy trading', 'Direct provider chat'] },
];

export function ProviderSubscriptionPlans() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Provider Subscription Plans</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Choose a plan to subscribe
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.popular ? 'ring-2 ring-primary-500' : ''}>
            {plan.popular && (
              <div className="mb-3">
                <Badge variant="primary">Most Popular</Badge>
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
              ${plan.price}<span className="text-sm text-gray-500 dark:text-gray-400">/mo</span>
            </p>
            <ul className="mt-4 space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckIcon size={16} className="text-green-500 mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button className="w-full mt-6" variant={plan.popular ? 'primary' : 'outline'}>
              Subscribe
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}