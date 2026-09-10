import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { AuditIcon } from '../../components/ui/icons';
import { signalSourceService, SourceMessage } from '../../services/signalSource.service';

export function SourceProcessingLogs() {
  const [messages, setMessages] = useState<SourceMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    signalSourceService.getMessages(undefined, 100).then(setMessages).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Processing Logs</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Complete log of message processing
        </p>
      </div>

      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Message ID</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Preview</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {messages.map((msg) => (
                <tr key={msg.id}>
                  <td className="px-6 py-3 font-mono text-xs text-gray-600 dark:text-gray-400">
                    {msg.id.slice(0, 8)}...
                  </td>
                  <td className="px-6 py-3">
                    <Badge variant={
                      msg.processingStatus === 'PROCESSED' ? 'success' :
                      msg.processingStatus === 'FILTERED' ? 'neutral' : 'warning'
                    }>
                      {msg.processingStatus}
                    </Badge>
                  </td>
                  <td className="px-6 py-3 text-gray-600 dark:text-gray-400 max-w-xs truncate">
                    {msg.messageText.slice(0, 60)}...
                  </td>
                  <td className="px-6 py-3 text-gray-500 dark:text-gray-400 text-xs">
                    {new Date(msg.receivedAt).toLocaleString()}
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