import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { EmptyState } from '../../components/common/EmptyState';
import { AuditIcon } from '../../components/ui/icons';
import apiClient from '../../api/client';

export function AuditLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/admin/audit-logs').then((res: any) => setLogs(res.data?.data || [])).catch(() => {}).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Audit Logs</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Complete audit trail</p>
      </div>

      {logs.length > 0 ? (
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actor</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Action</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Resource</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {logs.map((l) => (
                  <tr key={l.id}>
                    <td className="px-6 py-3 text-gray-700 dark:text-gray-300">{l.actorId || 'System'}</td>
                    <td className="px-6 py-3">
                      <Badge variant="neutral">{l.action}</Badge>
                    </td>
                    <td className="px-6 py-3 text-gray-600 dark:text-gray-400">{l.resource || '-'}</td>
                    <td className="px-6 py-3 text-xs text-gray-500 dark:text-gray-400">
                      {new Date(l.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <Card>
          <EmptyState
            icon={<AuditIcon size={32} className="text-gray-400" />}
            title="No Audit Logs"
            description="Audit logs will appear here."
          />
        </Card>
      )}
    </div>
  );
}