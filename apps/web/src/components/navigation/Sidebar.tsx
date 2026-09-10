import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

interface SidebarItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string | number;
}

interface SidebarProps {
  items: SidebarItem[];
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'admin' | 'compliance' | 'executive' | 'support' | 'provider' | 'whitelabel';
  isOpen?: boolean;
  onClose?: () => void;
}

const variantStyles = {
  default: { bg: 'bg-white dark:bg-gray-900', active: 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400', border: 'border-gray-200 dark:border-gray-800' },
  admin: { bg: 'bg-gray-900 dark:bg-gray-800', active: 'bg-red-600/20 text-red-400', border: 'border-gray-700' },
  compliance: { bg: 'bg-gray-900 dark:bg-gray-800', active: 'bg-green-600/20 text-green-400', border: 'border-gray-700' },
  executive: { bg: 'bg-gray-900 dark:bg-gray-800', active: 'bg-purple-600/20 text-purple-400', border: 'border-gray-700' },
  support: { bg: 'bg-gray-900 dark:bg-gray-800', active: 'bg-blue-600/20 text-blue-400', border: 'border-gray-700' },
  provider: { bg: 'bg-gray-900 dark:bg-gray-800', active: 'bg-orange-600/20 text-orange-400', border: 'border-gray-700' },
  whitelabel: { bg: 'bg-gray-900 dark:bg-gray-800', active: 'bg-teal-600/20 text-teal-400', border: 'border-gray-700' },
};

export function Sidebar({ items, title, subtitle, variant = 'default', isOpen = true, onClose }: SidebarProps) {
  const location = useLocation();
  const styles = variantStyles[variant];
  const isDark = variant !== 'default';

  return (
    <>
      {isOpen && onClose && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={clsx(
          'fixed lg:static inset-y-0 left-0 z-40 w-64 flex flex-col border-r transition-transform duration-300',
          styles.bg,
          styles.border,
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {(title || subtitle) && (
          <div className={clsx('flex items-center h-16 px-4 border-b', styles.border)}>
            <div>
              <p className={clsx('font-bold', isDark ? 'text-white' : 'text-gray-900 dark:text-white')}>{title}</p>
              {subtitle && (
                <p className={clsx('text-xs', isDark ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400')}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={clsx(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? styles.active
                        : isDark
                          ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    )}
                  >
                    <Icon size={18} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge !== undefined && (
                      <span className={clsx(
                        'px-1.5 py-0.5 text-xs rounded-full',
                        isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}