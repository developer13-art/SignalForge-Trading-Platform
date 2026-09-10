import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { tradeService } from '../../services/trade.service';

export function TradeEvents() {
  const { id } = useParams<{ id: string }>();
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      tradeService.getById(id).then((trade: any) => {
        setEvents(trade?.events || []);
      }).finally(() => setIsLoading(false));
    }
  }, [id]);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trade Events</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Complete event history for this trade
        </p>
      </div>

      <Card>
        <div className="space-y-2">
          {events.length > 0 ? events.map((event, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="w-6 h-6 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center shrink-0">
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 dark:text-white">{event.eventType}</span>
                  <Badge variant="neutral">{event.actor}</Badge>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(event.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          )) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">No events</p>
          )}
        </div>
      </Card>
    </div>
  );
}