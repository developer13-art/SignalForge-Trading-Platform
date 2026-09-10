import React from 'react';
import { MenuIcon, BellIcon } from '../ui/icons';
import { ThemeToggle } from '../common/ThemeToggle';

interface TopbarProps {
  title: string;
  onMenuClick?: () => void;
  user?: {
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
  };
  onNotificationClick?: () => void;
  unreadCount?: number;
  actions?: React.ReactNode;
}

export function Topbar({ title, onMenuClick, user, onNotificationClick, unreadCount, actions }: TopbarProps) {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-16 flex items-center justify-between px-4 lg:px-6 shrink-0">
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Toggle menu"
          >
            <MenuIcon size={20} />
          </button>
        )}
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        {actions}
        <ThemeToggle />
        {onNotificationClick && (
          <button
            onClick={onNotificationClick}
            className="relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Notifications"
          >
            <BellIcon size={20} />
            {unreadCount !== undefined && unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center px-1 text-xs font-semibold text-white bg-red-500 rounded-full">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>
        )}
        {user && (
          <div className="hidden sm:flex items-center gap-2 ml-2 pl-3 border-l border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {user.firstName} {user.lastName}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}