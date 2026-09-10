import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { clsx } from 'clsx';

const supportItems = [
  { label: 'Help Center', path: '/support', icon: '❓' },
  { label: 'Tickets', path: '/support/tickets', icon: '🎫' },
  { label: 'Knowledge Base', path: '/support/knowledge-base', icon: '📚' },
  { label: 'Trading FAQ', path: '/support/trading-faq', icon: '💹' },
  { label: 'KYC FAQ', path: '/support/kyc-faq', icon: '🪪' },
  { label: 'Billing FAQ', path: '/support/billing-faq', icon: '💳' },
  { label: 'Technical Support', path: '/support/technical', icon: '🔧' },
];

export function SupportLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      <aside className="w-64 bg-gray-900 dark:bg-gray-800 border-r border-gray-700">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b border-gray-700">
            <Link to="/support" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SF</span>
              </div>
              <span className="font-bold text-white">Support</span>
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {supportItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={clsx(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                      location.pathname === item.path
                        ? 'bg-blue-600/20 text-blue-400'
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
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Support Center</h1>
          <ThemeToggle />
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}