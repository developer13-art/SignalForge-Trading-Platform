import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { ArrowLeftIcon, SignalIcon } from '../../components/ui/icons';
import { signalSourceService, SourceMessage } from '../../services/signalSource.service';

export function SourceMessageDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState<SourceMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // In production, we would fetch by ID
      signalSourceService.getMessages().then((msgs) => {
        setMessage(msgs.find(m => m.id === id) || null);
      }).finally(() => setIsLoading(false));
    }
  }, [id]);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;
  if (!message) return <div>Message not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/signal-sources/messages')} className="text-gray-400 hover:text-gray-600">
          <ArrowLeftIcon size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Message Details</h1>
      </div>

      <Card>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant={
              message.processingStatus === 'PROCESSED' ? 'success' :
              message.processingStatus === 'FILTERED' ? 'neutral' : 'warning'
            }>
              {message.processingStatus}
            </Badge>
            {message.senderName && (
              <span className="text-sm text-gray-500 dark:text-gray-400">{message.senderName}</span>
            )}
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">Message Text</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{message.messageText}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Received</p>
              <p className="text-sm text-gray-900 dark:text-white mt-1">
                {new Date(message.receivedAt).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Message ID</p>
              <p className="text-sm text-gray-900 dark:text-white mt-1 font-mono">{message.id}</p>
            </div>
          </div>
        </div>
      </Card>

      {message.signals && message.signals.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Extracted Signals</h3>
          <div className="space-y-3">
            {message.signals.map((signal: any) => (
              <div key={signal.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <SignalIcon size={20} className="text-primary-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {signal.symbol} {signal.direction}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{signal.status}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}