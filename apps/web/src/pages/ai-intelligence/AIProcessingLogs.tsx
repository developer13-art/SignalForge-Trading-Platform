import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import apiClient from '../../api/client';

export function AIProcessingLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/ai/logs').then((res: any) => setLogs(res.data || [])).catch(() => {}).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Processing Logs</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Detailed log of every AI processing step
        </p>
      </div>

      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Parser Type</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">AI Model</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Confidence</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Latency</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-3">
                    <Badge variant={log.parserType === 'FAST_PATH' ? 'success' : 'primary'}>
                      {log.parserType}
                    </Badge>
                  </td>
                  <td className="px-6 py-3 text-gray-600 dark:text-gray-400 font-mono text-xs">
                    {log.aiModel || '-'}
                  </td>
                  <td className="px-6 py-3 text-gray-900 dark:text-white">
                    {log.confidence ? `${Math.round(log.confidence * 100)}%` : '-'}
                  </td>
                  <td className="px-6 py-3 text-gray-600 dark:text-gray-400">
                    {log.latencyMs ? `${log.latencyMs}ms` : '-'}
                  </td>
                  <td className="px-6 py-3 text-xs text-gray-500 dark:text-gray-400">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}