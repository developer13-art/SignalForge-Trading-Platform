import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  SignalIcon,
  AiIcon,
  RiskIcon,
  BrokerIcon,
  AnalyticsIcon,
  ArrowRightIcon,
  CheckIcon,
  ShieldIcon,
  TrendingUpIcon,
} from '../../components/ui/icons';

const features = [
  {
    icon: SignalIcon,
    title: 'AI Signal Intelligence',
    description: 'Advanced AI parses signals from any source regardless of writing style, language, or format.',
  },
  {
    icon: AiIcon,
    title: 'Provider DNA',
    description: 'Learns each provider\'s unique patterns for fast, reliable signal interpretation.',
  },
  {
    icon: RiskIcon,
    title: 'Risk Management',
    description: 'Configurable risk controls ensure nothing executes without passing validation.',
  },
  {
    icon: BrokerIcon,
    title: 'Cloud Execution',
    description: 'Connect MT4/MT5 accounts through MetaApi. No VPS, EA, or local terminal required.',
  },
  {
    icon: AnalyticsIcon,
    title: 'Enterprise Analytics',
    description: 'Track equity curves, drawdown, win rates, Sharpe ratios, and execution latency.',
  },
  {
    icon: TrendingUpIcon,
    title: 'Copy Trading',
    description: 'One signal fans out to thousands of subscribers with personalized risk settings.',
  },
];

const steps = [
  { number: '01', title: 'Connect Signal Sources', description: 'Telegram, Discord, Email, TradingView, and more.' },
  { number: '02', title: 'AI Parses & Validates', description: 'Signals are detected, normalized, and confidence-scored.' },
  { number: '03', title: 'Risk Engine Approves', description: 'Your rules determine what passes to execution.' },
  { number: '04', title: 'Execute & Track', description: 'Trades execute via MetaApi with full lifecycle tracking.' },
];

export function Home() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-transparent to-purple-600/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-medium mb-6">
                <SignalIcon size={14} />
                Enterprise Trading Intelligence
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
                Trade Smarter with{' '}
                <span className="text-gradient">AI-Powered</span>{' '}
                Signal Intelligence
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                SignalForge AI ingests trading signals from any source, uses AI to understand and validate them, applies your risk rules, and executes trades automatically on your connected broker account.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="btn-primary text-lg px-8 py-3">
                  Get Started Free
                  <ArrowRightIcon size={20} />
                </Link>
                <Link to="/how-it-works" className="btn-outline text-lg px-8 py-3">
                  Learn More
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <CheckIcon size={16} className="text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">No VPS required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon size={16} className="text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">MT4/MT5 supported</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon size={16} className="text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">KYC secured</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Live Signal Processing</span>
                  <span className="badge-success">Active</span>
                </div>
                <div className="space-y-3">
                  {[
                    { symbol: 'XAUUSD', direction: 'BUY', confidence: 97, time: '09:41:02' },
                    { symbol: 'EURUSD', direction: 'SELL', confidence: 92, time: '09:38:15' },
                    { symbol: 'GBPUSD', direction: 'BUY', confidence: 88, time: '09:35:48' },
                    { symbol: 'USDJPY', direction: 'BUY', confidence: 95, time: '09:32:21' },
                  ].map((signal) => (
                    <div key={signal.time} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{signal.symbol}</span>
                        <span className={signal.direction === 'BUY' ? 'badge-success' : 'badge-danger'}>
                          {signal.direction}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{signal.confidence}%</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{signal.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '6+', label: 'Signal Sources' },
              { value: '99.6%', label: 'Parse Accuracy' },
              { value: '< 100ms', label: 'Signal Processing' },
              { value: '24/7', label: 'Cloud Execution' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-extrabold text-primary-600 dark:text-primary-400">{stat.value}</div>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Everything You Need to Automate Trading
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From signal ingestion to execution and analytics, SignalForge provides a complete trading automation platform.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="card h-full p-6 card-hover">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                      <Icon size={24} className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white dark:bg-gray-900 py-20 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">How SignalForge Works</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 dark:bg-gray-700" />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-12">
            <ShieldIcon size={48} className="text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Automate Your Trading?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Join thousands of traders using SignalForge AI to trade smarter.
            </p>
            <Link to="/register" className="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Create Free Account
              <ArrowRightIcon size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}