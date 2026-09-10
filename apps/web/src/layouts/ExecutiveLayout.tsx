import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { clsx } from 'clsx';

const executiveItems = [
  { label: 'Dashboard', path: '/executive', icon: '📊' },
  { label: 'Subscription Revenue', path: '/executive/subscription-revenue', icon: '💳' },
  { label: 'Marketplace Revenue', path: '/executive/marketplace-revenue', icon: '🏪' },
  { label: 'Provider Revenue', path: '/executive/provider-revenue', icon: '🏢' },
  { label: 'Affiliate Revenue', path: '/executive/affiliate-revenue', icon: '🤝' },
  { label: 'IB Revenue', path: '/executive/ib-revenue', icon: '🏦' },
  { label: 'Referral Cost', path: '/executive/referral-cost', icon: '💰' },
  { label: 'Net Revenue', path: '/executive/net-revenue', icon: '📈' },
  { label: 'User Growth', path: '/executive/user-growth', icon: '👥' },
  { label: 'Provider Growth', path: '/executive/provider-growth', icon: '📊' },
  { label: 'Trader Growth', path: '/executive/trader-growth', icon: '📈' },
  { label: 'Trading Volume', path: '/executive/trading-volume', icon: '💹' },
  { label: 'Platform Performance', path: '/executive/platform-performance', icon: '⚡' },
  { label: 'Retention', path: '/executive/retention', icon: '🔄' },
  { label: 'Financial Reports', path: '/executive/financial-reports', icon: '📋' },
];

export function ExecutiveLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      <aside className="w-64 bg-gray-900 dark:bg-gray-800 border-r border-gray-700">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b border-gray-700">
            <Link to="/executive" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SF</span>
              </div>
              <span className="font-bold text-white">Executive</span>
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {executiveItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={clsx(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                      location.pathname === item.path
                        ? 'bg-purple-600/20 text-purple-400'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                    )}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-16 flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Executive Dashboard</h1>
          <ThemeToggle />
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}