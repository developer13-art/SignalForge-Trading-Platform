import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { EmptyState } from '../../components/common/EmptyState';
import { SignalIcon, ArrowRightIcon, ClockIcon } from '../../components/ui/icons';
import { signalSourceService, SourceMessage } from '../../services/signalSource.service';

export function SourceMessageInbox() {
  const [messages, setMessages] = useState<SourceMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    signalSourceService.getMessages().then(setMessages).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Message Inbox</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Raw messages received from all sources
        </p>
      </div>

      {messages.length > 0 ? (
        <div className="space-y-3">
          {messages.map((msg) => (
            <Card key={msg.id} hoverable>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={
                      msg.processingStatus === 'PROCESSED' ? 'success' :
                      msg.processingStatus === 'FILTERED' ? 'neutral' : 'warning'
                    }>
                      {msg.processingStatus}
                    </Badge>
                    {msg.senderName && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">{msg.senderName}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{msg.messageText}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <ClockIcon size={12} />
                      {new Date(msg.receivedAt).toLocaleString()}
                    </div>
                  </div>
                </div>
                <Link to={`/signal-sources/messages/${msg.id}`} className="text-primary-600 hover:text-primary-700 shrink-0">
                  <ArrowRightIcon size={16} />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <EmptyState
            icon={<SignalIcon size={32} className="text-gray-400" />}
            title="No Messages"
            description="Messages will appear here once signals are received."
          />
        </Card>
      )}
    </div>
  );
}