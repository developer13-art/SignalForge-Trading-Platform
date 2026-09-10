import React from 'react';
import { ShieldIcon, LockIcon, AuditIcon, SecurityIcon } from '../../components/ui/icons';

const pillars = [
  { icon: ShieldIcon, title: 'Encryption', description: 'All sensitive data encrypted at rest and in transit using AES-256-GCM and TLS 1.3.' },
  { icon: LockIcon, title: 'Secrets Vault', description: 'Broker credentials, Telegram sessions, and API keys stored in a dedicated secrets vault.' },
  { icon: AuditIcon, title: 'Full Audit Trail', description: 'Every action — trade, KYC decision, referral reward — is logged immutably.' },
  { icon: SecurityIcon, title: 'Zero Trust', description: 'Every request authenticated, authorized, and validated against KYC and compliance rules.' },
];

export function Security() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Security</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Enterprise-grade security protecting your data, credentials, and trades.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="card p-6">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Icon size={24} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{p.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{p.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Additional Controls</h2>
          <ul className="grid md:grid-cols-2 gap-3">
            {[
              'Two-factor authentication',
              'Role-based access control',
              'Session and device management',
              'Rate limiting and DDoS protection',
              'Webhook signature verification',
              'Server-side KYC gating',
              'Immutable ledger accounting',
              'Secrets rotation support',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="w-1.5 h-1.5 bg-primary-600 rounded-full" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}