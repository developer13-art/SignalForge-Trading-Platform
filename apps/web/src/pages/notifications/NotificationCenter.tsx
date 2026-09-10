import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { EmptyState } from '../../components/common/EmptyState';
import { BellIcon } from '../../components/ui/icons';
import { notificationService } from '../../services/notification.service';

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    notificationService.getAll().then(setNotifications).finally(() => setIsLoading(false));
  }, []);

  const handleMarkAll = async () => {
    await notificationService.markAllAsRead();
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notification Center</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            All your notifications in one place
          </p>
        </div>
        <Button variant="outline" onClick={handleMarkAll}>Mark All as Read</Button>
      </div>

      {notifications.length > 0 ? (
        <div className="space-y-2">
          {notifications.map((n) => (
            <Card key={n.id} className={!n.isRead ? 'border-l-4 border-l-primary-500' : ''}>
              <div className="flex items-start gap-3">
                {!n.isRead && (
                  <span className="w-2 h-2 bg-primary-600 rounded-full mt-2 shrink-0" />
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 dark:text-white">{n.title}</p>
                    <Badge variant="neutral">{n.type}</Badge>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{n.message}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <EmptyState
            icon={<BellIcon size={32} className="text-gray-400" />}
            title="No Notifications"
            description="You'll see notifications here as they arrive."
          />
        </Card>
      )}
    </div>
  );
}