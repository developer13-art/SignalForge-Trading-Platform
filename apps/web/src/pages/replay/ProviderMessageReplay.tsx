import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export function ProviderMessageReplay() {
  const [messageId, setMessageId] = useState('');
  const [message, setMessage] = useState<any>(null);

  const handleReplay = () => {
    setMessage({
      receivedAt: new Date().toISOString(),
      sender: 'Trader X',
      text: 'BUY GOLD @ 3350 SL 3340 TP 3370 TP2 3385',
      classification: 'NEW_TRADE',
      parsed: { symbol: 'XAUUSD', direction: 'BUY', sl: 3340, tps: [3370, 3385] },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Provider Message Replay</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">See original and parsed message</p>
      </div>

      <Card>
        <div className="flex gap-2">
          <Input placeholder="Enter Message ID" value={messageId} onChange={(e) => setMessageId(e.target.value)} />
          <Button onClick={handleReplay}>Replay</Button>
        </div>
      </Card>

      {message && (
        <Card>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Original Message</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 italic">"{message.text}"</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Parsed</p>
              <pre className="p-3 bg-gray-900 text-green-400 rounded-lg overflow-x-auto text-xs">
                {JSON.stringify(message.parsed, null, 2)}
              </pre>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}