import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { clsx } from 'clsx';

const providerItems = [
  { label: 'Dashboard', path: '/provider', icon: '📊' },
  { label: 'Profile', path: '/provider/profile', icon: '👤' },
  { label: 'Subscribers', path: '/provider/subscribers', icon: '👥' },
  { label: 'Revenue', path: '/provider/revenue', icon: '💰' },
  { label: 'Analytics', path: '/provider/analytics', icon: '📈' },
  { label: 'Signals', path: '/provider/signals', icon: '⚡' },
  { label: 'Provider DNA', path: '/provider/dna', icon: '🧬' },
  { label: 'Certification', path: '/provider/certification', icon: '🎖️' },
  { label: 'Subscription Plans', path: '/provider/plans', icon: '💳' },
  { label: 'Withdrawals', path: '/provider/withdrawals', icon: '🏧' },
  { label: 'Affiliates', path: '/provider/affiliates', icon: '🤝' },
  { label: 'Marketing', path: '/provider/marketing', icon: '📢' },
  { label: 'Reviews', path: '/provider/reviews', icon: '⭐' },
  { label: 'Settings', path: '/provider/settings', icon: '⚙️' },
];

export function ProviderLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      <aside className="w-64 bg-gray-900 dark:bg-gray-800 border-r border-gray-700">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b border-gray-700">
            <Link to="/provider" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SF</span>
              </div>
              <span className="font-bold text-white">Provider</span>
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {providerItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={clsx(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                      location.pathname === item.path
                        ? 'bg-orange-600/20 text-orange-400'
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
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Provider Dashboard</h1>
          <ThemeToggle />
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}