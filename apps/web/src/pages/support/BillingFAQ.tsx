import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { ChevronDownIcon } from '../../components/ui/icons';

const faqs = [
  { q: 'What payment methods do you accept?', a: 'We accept card payments via Paystack and are adding Stripe for global payments.' },
  { q: 'Can I upgrade or downgrade my plan?', a: 'Yes. Upgrades apply immediately; downgrades apply at the end of the current period.' },
  { q: 'How do I cancel my subscription?', a: 'Go to Subscriptions → Manage → Cancel. Your access continues until the end of the period.' },
  { q: 'Do you offer refunds?', a: 'We offer refunds on a case-by-case basis. Contact support for details.' },
  { q: 'Is there a free trial?', a: 'Yes. New users get a trial period on signup. Details are shown on the pricing page.' },
];

export function BillingFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Billing FAQ</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Common questions about billing</p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <Card key={i}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between text-left"
            >
              <span className="font-medium text-gray-900 dark:text-white">{faq.q}</span>
              <ChevronDownIcon
                size={18}
                className={`text-gray-400 shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`}
              />
            </button>
            {open === i && (
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{faq.a}</p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}