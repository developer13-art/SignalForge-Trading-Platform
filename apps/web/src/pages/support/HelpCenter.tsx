import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { ArrowRightIcon, SignalIcon, KycIcon, WalletIcon, SettingsIcon, BrokerIcon, SecurityIcon } from '../../components/ui/icons';

const categories = [
  { icon: SignalIcon, title: 'Trading', description: 'Signals, automation, execution', link: '/support/trading-faq' },
  { icon: KycIcon, title: 'KYC & Identity', description: 'Verification and documents', link: '/support/kyc-faq' },
  { icon: WalletIcon, title: 'Billing', description: 'Subscriptions and payments', link: '/support/billing-faq' },
  { icon: BrokerIcon, title: 'Broker Setup', description: 'Connect MT4/MT5 accounts', link: '/support/knowledge-base' },
  { icon: SecurityIcon, title: 'Security', description: 'Account security and 2FA', link: '/support/knowledge-base' },
  { icon: SettingsIcon, title: 'Account', description: 'Settings and preferences', link: '/support/knowledge-base' },
];

export function HelpCenter() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Help Center</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Find answers to your questions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link key={cat.title} to={cat.link}>
              <Card hoverable>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{cat.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{cat.description}</p>
                  </div>
                  <ArrowRightIcon size={16} className="text-gray-400 shrink-0 mt-1" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}