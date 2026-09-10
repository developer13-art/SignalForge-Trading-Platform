import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useNotificationStore } from '../../stores/notification.store';
import { CheckIcon } from '../ui/icons';

interface NotificationListProps {
  onClose?: () => void;
}

export function NotificationList({ onClose }: NotificationListProps) {
  const { notifications, markAsRead, markAllAsRead } = useNotificationStore();

  return (
    <Card padding="none" className="shadow-xl max-h-[600px] overflow-hidden flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
        {notifications.length > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500 dark:text-gray-400">
            No notifications
          </div>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-gray-800">
            {notifications.map((notif) => (
              <li key={notif.id}>
                <button
                  onClick={() => markAsRead(notif.id)}
                  className={`w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                    !notif.isRead ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {!notif.isRead && (
                      <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{notif.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.message}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {new Date(notif.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {onClose && (
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <Button variant="ghost" size="sm" className="w-full" onClick={onClose}>
            Close
          </Button>
        </div>
      )}
    </Card>
  );
}