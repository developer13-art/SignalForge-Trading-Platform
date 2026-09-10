import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export function ExecutionReplay() {
  const [tradeId, setTradeId] = useState('');
  const [log, setLog] = useState<string | null>(null);

  const handleReplay = () => {
    setLog(`[09:41:05.120] POST /trade {symbol: XAUUSD, volume: 0.05, type: ORDER_TYPE_BUY}
[09:41:05.340] MetaApi response: 200 OK
[09:41:05.400] Position opened: ticket #12345678 @ 3350.50`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Execution Replay</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Reconstruct MetaApi execution</p>
      </div>

      <Card>
        <div className="flex gap-2">
          <Input placeholder="Enter Trade ID" value={tradeId} onChange={(e) => setTradeId(e.target.value)} />
          <Button onClick={handleReplay}>Replay</Button>
        </div>
      </Card>

      {log && (
        <Card>
          <pre className="p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto text-xs">{log}</pre>
        </Card>
      )}
    </div>
  );
}