import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { ChevronDownIcon } from '../../components/ui/icons';

const faqs = [
  { q: 'How does automated trading work?', a: 'When a signal is received and passes all validation and risk checks, SignalForge executes it on your connected broker account via MetaApi.' },
  { q: 'Can I trade on Demo and Live?', a: 'Yes. You can connect both demo and live accounts and select which to use per provider.' },
  { q: 'What happens if a trade fails?', a: 'You receive a notification with the failure reason. Failed trades are logged for audit purposes.' },
  { q: 'Can I override provider instructions?', a: 'Yes. You can manually close, modify, or intervene in any trade from the Trading section.' },
  { q: 'Does SignalForge take a cut of my profits?', a: 'No. SignalForge earns through subscriptions. Your trading profits are yours alone.' },
];

export function TradingFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trading FAQ</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Common questions about trading</p>
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