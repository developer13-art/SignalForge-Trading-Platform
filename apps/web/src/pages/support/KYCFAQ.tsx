import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { ChevronDownIcon } from '../../components/ui/icons';

const faqs = [
  { q: 'Why do I need to complete KYC?', a: 'KYC is a regulatory requirement. It also protects our users and platform from fraud.' },
  { q: 'What documents are accepted?', a: 'National ID, Voter\'s Card, Driver\'s Licence, International Passport, and other admin-configured ID types.' },
  { q: 'How long does KYC take?', a: 'Usually 1-3 business days. Automated checks run instantly, but manual review may extend the timeline.' },
  { q: 'What if my KYC is rejected?', a: 'You can resubmit with corrected information. The reason for rejection will be shown in your KYC dashboard.' },
  { q: 'Is my data safe?', a: 'Yes. All documents are encrypted at rest and stored in private object storage.' },
];

export function KYCFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">KYC FAQ</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Common questions about KYC</p>
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