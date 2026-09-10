import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { MonitorIcon } from '../../components/ui/icons';
import { deviceService } from '../../services/device.service';
import toast from 'react-hot-toast';

export function ConnectedDevices() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    deviceService.getSessions().then(setSessions).catch(() => {}).finally(() => setIsLoading(false));
  }, []);

  const handleRevoke = async (id: string) => {
    try {
      await deviceService.revokeSession(id);
      setSessions(sessions.filter(s => s.id !== id));
      toast.success('Session revoked');
    } catch {
      toast.error('Failed to revoke');
    }
  };

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Connected Devices</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage devices with active sessions
        </p>
      </div>

      <div className="space-y-3">
        {sessions.map((session) => (
          <Card key={session.id}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <MonitorIcon size={20} className="text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {session.userAgent?.slice(0, 60) || 'Unknown device'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  IP: {session.ipAddress || 'Unknown'} • Last seen: {new Date(session.lastSeenAt).toLocaleString()}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleRevoke(session.id)}>
                Revoke
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}