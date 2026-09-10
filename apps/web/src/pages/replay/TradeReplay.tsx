import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { SignalIcon, CheckIcon } from '../../components/ui/icons';

export function TradeReplay() {
  const [tradeId, setTradeId] = useState('');
  const [events, setEvents] = useState<any[]>([]);

  const handleReplay = () => {
    setEvents([
      { time: '09:41:02', label: 'Signal received' },
      { time: '09:41:03', label: 'Parsed by AI' },
      { time: '09:41:04', label: 'Risk approved' },
      { time: '09:41:05', label: 'Order sent to broker' },
      { time: '09:41:06', label: 'Position opened' },
    ]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trade Replay</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Reconstruct the complete trade timeline
        </p>
      </div>

      <Card>
        <div className="flex gap-2">
          <Input
            placeholder="Enter Trade ID"
            value={tradeId}
            onChange={(e) => setTradeId(e.target.value)}
          />
          <Button onClick={handleReplay}>Replay</Button>
        </div>
      </Card>

      {events.length > 0 && (
        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Timeline</h3>
          <div className="space-y-3">
            {events.map((e, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0">
                  <CheckIcon size={14} />
                </div>
                <span className="text-xs font-mono text-gray-500 dark:text-gray-400 w-20">{e.time}</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">{e.label}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}