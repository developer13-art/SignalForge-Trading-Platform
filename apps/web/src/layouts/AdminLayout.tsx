import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { useAuthStore } from '../stores/auth.store';
import { clsx } from 'clsx';
import {
  DashboardIcon,
  UsersIcon,
  KycIcon,
  ProviderIcon,
  TraderIcon,
  SourceIcon,
  BrokerIcon,
  MonitorIcon,
  AiIcon,
  RiskIcon,
  ReferralIcon,
  SubscriptionIcon,
  WalletIcon,
  MarketplaceIcon,
  AuditIcon,
  SecurityIcon,
  SettingsIcon,
  LogoutIcon,
  MenuIcon,
  CloseIcon,
} from '../components/ui/icons';

const adminNavigationItems = [
  { label: 'Overview', path: '/admin', icon: DashboardIcon },
  { label: 'Users', path: '/admin/users', icon: UsersIcon },
  { label: 'KYC Management', path: '/admin/kyc', icon: KycIcon },
  { label: 'Providers', path: '/admin/providers', icon: ProviderIcon },
  { label: 'Traders', path: '/admin/traders', icon: TraderIcon },
  { label: 'Signal Sources', path: '/admin/signal-sources', icon: SourceIcon },
  { label: 'Brokers', path: '/admin/brokers', icon: BrokerIcon },
  { label: 'Live Monitor', path: '/admin/live-monitor', icon: MonitorIcon },
  { label: 'AI Monitoring', path: '/admin/ai-monitoring', icon: AiIcon },
  { label: 'Risk Monitoring', path: '/admin/risk-monitoring', icon: RiskIcon },
  { label: 'Referrals', path: '/admin/referrals', icon: ReferralIcon },
  { label: 'Subscriptions', path: '/admin/subscriptions', icon: SubscriptionIcon },
  { label: 'Payments', path: '/admin/payments', icon: WalletIcon },
  { label: 'Marketplace', path: '/admin/marketplace', icon: MarketplaceIcon },
  { label: 'Audit Logs', path: '/admin/audit-logs', icon: AuditIcon },
  { label: 'Security', path: '/admin/security', icon: SecurityIcon },
  { label: 'System Settings', path: '/admin/settings', icon: SettingsIcon },
];

export function AdminLayout() {
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
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={clsx(
          'fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-900 dark:bg-gray-800 border-r border-gray-700 transition-transform duration-300 flex flex-col',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SF</span>
            </div>
            <div>
              <span className="font-bold text-white block leading-tight">Admin Console</span>
              <span className="text-xs text-red-400 font-medium">Platform Control</span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-200"
            aria-label="Close sidebar"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {adminNavigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={clsx(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-red-600/20 text-red-400'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                    )}
                  >
                    <Icon size={18} className={isActive ? 'text-red-400' : 'text-gray-500'} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <LogoutIcon size={18} />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
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
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
              {user?.firstName} {user?.lastName}
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}