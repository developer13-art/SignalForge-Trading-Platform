import React from 'react';
import {
  SignalIcon, AiIcon, RiskIcon, BrokerIcon, AnalyticsIcon, ReferralIcon,
  KycIcon, SubscriptionIcon, ProviderIcon, ShieldIcon,
} from '../../components/ui/icons';

const features = [
  { icon: SignalIcon, title: 'Multi-Source Signal Ingestion', description: 'Connect Telegram, Discord, WhatsApp, Email, TradingView, and REST API sources from one dashboard.' },
  { icon: AiIcon, title: 'AI Signal Intelligence', description: 'Advanced AI parses free-form messages into structured trade objects regardless of language or style.' },
  { icon: ProviderIcon, title: 'Provider DNA', description: 'Learns each provider\'s unique patterns, abbreviations, and terminology for fast, accurate parsing.' },
  { icon: RiskIcon, title: 'Multi-Layer Risk Engine', description: 'Daily loss limits, drawdown, exposure, correlation, sessions, news filter, and emergency stop.' },
  { icon: BrokerIcon, title: 'Cloud Execution', description: 'MT4/MT5 accounts connected via MetaApi. No EA, VPS, or local terminal required.' },
  { icon: SignalIcon, title: 'Copy Trading Fan-Out', description: 'One signal fans out to thousands of subscribers with per-user risk personalization.' },
  { icon: AnalyticsIcon, title: 'Enterprise Analytics', description: 'Equity curve, P&L, drawdown, Sharpe, Sortino, win rate, and execution latency.' },
  { icon: ReferralIcon, title: 'Platform-Funded Referrals', description: 'Earn 0.1% of your referrals\' eligible net profit — funded by SignalForge, not the trader.' },
  { icon: KycIcon, title: 'Bank-Grade KYC', description: 'Document upload, liveness verification, admin review, and full audit trail.' },
  { icon: SubscriptionIcon, title: 'Flexible Subscriptions', description: 'Monthly, yearly, or lifetime plans with recurring billing via Paystack or Stripe.' },
  { icon: ShieldIcon, title: 'Enterprise Security', description: 'Encrypted sessions, secrets vault, 2FA, RBAC, and immutable audit logs.' },
  { icon: ProviderIcon, title: 'Marketplace', description: 'Discover verified providers and traders, follow strategies, and compare performance.' },
];

export function Features() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Features</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to run, automate, and monetize your trading strategy.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="card p-6 card-hover">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Icon size={24} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}