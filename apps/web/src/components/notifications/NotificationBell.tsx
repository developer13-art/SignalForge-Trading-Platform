import React, { useState } from 'react';
import { BellIcon } from '../ui/icons';
import { useNotificationStore } from '../../stores/notification.store';
import { NotificationList } from './NotificationList';

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { unreadCount } = useNotificationStore();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Notifications"
      >
        <BellIcon size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center px-1 text-xs font-semibold text-white bg-red-500 rounded-full">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-96 max-w-[calc(100vw-2rem)] z-50">
            <NotificationList onClose={() => setOpen(false)} />
          </div>
        </>
      )}
    </div>
  );
}