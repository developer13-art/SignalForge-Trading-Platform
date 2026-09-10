import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  SourceIcon, AiIcon, ShieldIcon, TradingIcon, AnalyticsIcon,
  ArrowRightIcon, CheckIcon,
} from '../../components/ui/icons';

const steps = [
  { number: '01', title: 'Connect Sources', description: 'Telegram, Discord, WhatsApp, Email, TradingView, or REST API.', icon: SourceIcon },
  { number: '02', title: 'AI Understands', description: 'Classification, extraction, Provider DNA, and confidence scoring.', icon: AiIcon },
  { number: '03', title: 'Risk Validates', description: 'Multi-layer checks: daily loss, exposure, sessions, margin.', icon: ShieldIcon },
  { number: '04', title: 'Execute & Track', description: 'Executed via MetaApi with full lifecycle and audit tracking.', icon: TradingIcon },
];

export function HowSignalForgeWorks() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">How SignalForge Works</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            From raw provider messages to executed trades — an intelligent pipeline you fully control.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="card p-6 h-full">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <span className="text-xs font-bold text-primary-600 dark:text-primary-400">{step.number}</span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{step.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">The Complete Flow</h2>
          <div className="space-y-3">
            {[
              'Provider posts a signal in Telegram',
              'SignalForge captures and stores the raw message',
              'AI classifier determines if it is a trade signal',
              'Parser extracts symbol, direction, entry, SL, TP',
              'Provider DNA applies learned patterns',
              'Confidence score calculated',
              'Duplicate detection prevents re-processing',
              'Risk engine validates against your rules',
              'Signal fans out to eligible subscribers',
              'Each user gets a personalized order',
              'Execution via MetaApi to your broker',
              'Trade lifecycle tracked and audited',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckIcon size={14} className="text-green-600 dark:text-green-400" />
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/register" className="btn-primary">
              Get Started <ArrowRightIcon size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}