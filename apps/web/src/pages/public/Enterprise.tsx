import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldIcon, UsersIcon, AnalyticsIcon, ProviderIcon, ArrowRightIcon } from '../../components/ui/icons';

export function Enterprise() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Enterprise</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Custom solutions for brokers, prop firms, and large trading organizations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            { icon: ShieldIcon, title: 'Dedicated Infrastructure', description: 'Isolated environments with dedicated databases and queues.' },
            { icon: UsersIcon, title: 'Unlimited Seats', description: 'Add team members with granular role-based access.' },
            { icon: AnalyticsIcon, title: 'Advanced Analytics', description: 'Custom reports, data export, and BI integrations.' },
            { icon: ProviderIcon, title: 'White Label', description: 'Full white label with custom domain, branding, and pricing.' },
          ].map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="card p-6">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Icon size={24} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{f.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{f.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Talk to Our Team</h2>
          <p className="text-white/80 mb-8">Custom SLAs, dedicated support, and enterprise pricing.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition">
            Contact Sales <ArrowRightIcon size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}