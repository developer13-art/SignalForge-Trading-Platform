import React from 'react';
import { Link } from 'react-router-dom';
import { SourceIcon, ArrowRightIcon } from '../../components/ui/icons';

export function APIPlatform() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">API Platform</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Integrate SignalForge with your existing infrastructure using our REST API.
          </p>
        </div>

        <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-6 mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <pre className="text-green-400 text-sm font-mono overflow-x-auto">
{`POST /api/provider/signal
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "symbol": "XAUUSD",
  "direction": "BUY",
  "entry": 3350.00,
  "stopLoss": 3340.00,
  "takeProfit": 3365.00,
  "confidence": 0.95
}`}
          </pre>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            'REST endpoints for signals and trades',
            'Webhook support for real-time events',
            'API key authentication',
            'Rate limiting and audit logs',
            'Sandbox environment',
            'Full API documentation',
          ].map((item) => (
            <div key={item} className="card p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                <SourceIcon size={16} className="text-primary-600" />
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{item}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/register" className="btn-primary">
            Get API Access <ArrowRightIcon size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}