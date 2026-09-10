import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { CheckIcon } from '../../components/ui/icons';

export function SignalReplay() {
  const [signalId, setSignalId] = useState('');
  const [events, setEvents] = useState<any[]>([]);

  const handleReplay = () => {
    setEvents([
      { time: '09:41:02', label: 'Raw message received' },
      { time: '09:41:02', label: 'Classified as NEW_TRADE' },
      { time: '09:41:03', label: 'AI extraction completed' },
      { time: '09:41:03', label: 'Provider DNA applied' },
      { time: '09:41:04', label: 'Confidence: 94%' },
      { time: '09:41:04', label: 'Validation passed' },
    ]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Signal Replay</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          See how a signal was processed
        </p>
      </div>

      <Card>
        <div className="flex gap-2">
          <Input placeholder="Enter Signal ID" value={signalId} onChange={(e) => setSignalId(e.target.value)} />
          <Button onClick={handleReplay}>Replay</Button>
        </div>
      </Card>

      {events.length > 0 && (
        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Pipeline Timeline</h3>
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