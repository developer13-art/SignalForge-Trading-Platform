import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export function AIProcessingReplay() {
  const [messageId, setMessageId] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleReplay = () => {
    setResult({
      path: 'FAST_PATH',
      provider: 'Trader X',
      dnaConfidence: 0.92,
      parseConfidence: 0.96,
      latencyMs: 45,
      extracted: { symbol: 'XAUUSD', direction: 'BUY', entryType: 'MARKET' },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Processing Replay</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Reconstruct AI decision path</p>
      </div>

      <Card>
        <div className="flex gap-2">
          <Input placeholder="Enter Message ID" value={messageId} onChange={(e) => setMessageId(e.target.value)} />
          <Button onClick={handleReplay}>Replay</Button>
        </div>
      </Card>

      {result && (
        <Card>
          <pre className="p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto text-xs">
            {JSON.stringify(result, null, 2)}
          </pre>
        </Card>
      )}
    </div>
  );
}