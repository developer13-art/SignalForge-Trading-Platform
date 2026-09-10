import React from 'react';
import { Link } from 'react-router-dom';
import { ProviderIcon, ArrowRightIcon } from '../../components/ui/icons';

export function WhiteLabel() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">White Label Platform</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Launch your own branded trading intelligence platform in days, not months.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            'Custom domain and branding',
            'Your logo, colors, and typography',
            'Custom pricing and plans',
            'Independent user database',
            'Provider marketplace control',
            'Revenue analytics and reporting',
          ].map((item) => (
            <div key={item} className="card p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <ProviderIcon size={16} className="text-green-600" />
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{item}</p>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to Launch?</h2>
          <Link to="/contact" className="btn-primary">
            Request White Label Access <ArrowRightIcon size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}