import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { CheckIcon } from '../../components/ui/icons';

export function RiskDecisionReplay() {
  const [signalId, setSignalId] = useState('');
  const [decision, setDecision] = useState<any>(null);

  const handleReplay = () => {
    setDecision({
      approved: true,
      checks: [
        { name: 'Signal validity', passed: true },
        { name: 'Daily loss', passed: true },
        { name: 'Max open trades', passed: true },
        { name: 'Trading session', passed: true },
        { name: 'Duplicate check', passed: true },
      ],
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Risk Decision Replay</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Replay risk evaluation</p>
      </div>

      <Card>
        <div className="flex gap-2">
          <Input placeholder="Enter Signal ID" value={signalId} onChange={(e) => setSignalId(e.target.value)} />
          <Button onClick={handleReplay}>Replay</Button>
        </div>
      </Card>

      {decision && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Decision</h3>
            <Badge variant={decision.approved ? 'success' : 'danger'}>
              {decision.approved ? 'APPROVED' : 'REJECTED'}
            </Badge>
          </div>
          <div className="space-y-2">
            {decision.checks.map((c: any, i: number) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center">
                  <CheckIcon size={12} />
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">{c.name}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}