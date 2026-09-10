import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

const examples = [
  { input: 'Buy Gold', output: { action: 'BUY', symbol: 'XAUUSD', entryType: 'MARKET' } },
  { input: 'Long XAU @ 3350 SL 3340 TP 3370', output: { action: 'BUY', symbol: 'XAUUSD', entry: 3350, stopLoss: 3340, takeProfits: [3370] } },
  { input: 'EURUSD sell limit 1.1050', output: { action: 'SELL', symbol: 'EURUSD', entryType: 'LIMIT', entry: 1.1050 } },
  { input: 'Let\'s buy gold now', output: { action: 'BUY', symbol: 'XAUUSD', entryType: 'MARKET' } },
];

export function SignalInterpretation() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Signal Interpretation</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          How AI interprets different phrasings into structured signals
        </p>
      </div>

      <div className="space-y-4">
        {examples.map((ex, i) => (
          <Card key={i}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">Input</p>
                <p className="text-sm text-gray-900 dark:text-white italic">"{ex.input}"</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">Parsed Output</p>
                <pre className="text-xs text-primary-600 dark:text-primary-400 font-mono">
                  {JSON.stringify(ex.output, null, 2)}
                </pre>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}