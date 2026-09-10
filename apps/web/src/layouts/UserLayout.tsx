import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { useAuthStore } from '../stores/auth.store';
import { clsx } from 'clsx';
import {
  DashboardIcon,
  SignalIcon,
  SourceIcon,
  TradingIcon,
  RiskIcon,
  BrokerIcon,
  AnalyticsIcon,
  MarketplaceIcon,
  ReferralIcon,
  SubscriptionIcon,
  WalletIcon,
  SettingsIcon,
  KycIcon,
  BellIcon,
  MenuIcon,
  CloseIcon,
  LogoutIcon,
} from '../components/ui/icons';

const navigationItems = [
  { label: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
  { label: 'KYC Verification', path: '/kyc', icon: KycIcon },
  { label: 'Signals', path: '/signals', icon: SignalIcon },
  { label: 'Signal Sources', path: '/signal-sources', icon: SourceIcon },
  { label: 'Trading', path: '/trading', icon: TradingIcon },
  { label: 'Risk & Automation', path: '/risk', icon: RiskIcon },
  { label: 'Brokers', path: '/brokers', icon: BrokerIcon },
  { label: 'Analytics', path: '/analytics', icon: AnalyticsIcon },
  { label: 'Marketplace', path: '/marketplace', icon: MarketplaceIcon },
  { label: 'Referrals', path: '/referrals', icon: ReferralIcon },
  { label: 'Subscriptions', path: '/subscriptions', icon: SubscriptionIcon },
  { label: 'Wallet', path: '/wallet', icon: WalletIcon },
  { label: 'Settings', path: '/settings', icon: SettingsIcon },
];

export function UserLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 flex flex-col',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SF</span>
            </div>
            <div>
              <span className="font-bold text-gray-900 dark:text-white block leading-tight">SignalForge</span>
              <span className="text-xs text-primary-600 dark:text-primary-400 font-medium">AI Platform</span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Close sidebar"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={clsx(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    )}
                  >
                    <Icon size={18} className={isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center shrink-0">
              <span className="text-primary-700 dark:text-primary-400 font-semibold text-sm">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-500 transition-colors"
              title="Logout"
              aria-label="Logout"
            >
              <LogoutIcon size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-16 flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Toggle sidebar"
            >
              <MenuIcon size={20} />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              {navigationItems.find((item) => location.pathname.startsWith(item.path))?.label || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              className="relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Notifications"
            >
              <BellIcon size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}