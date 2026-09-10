import React from 'react';
import { PricingPlans } from '../subscriptions/PricingPlans';

export function Pricing() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Pricing</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Simple, transparent pricing. Cancel anytime.
          </p>
        </div>
        <PricingPlans />
      </section>
    </div>
  );
}