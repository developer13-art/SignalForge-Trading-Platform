import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';

export function BestWorstSymbols() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Placeholder — in production, use analyticsService.getSymbolPerformance
    setData([]);
    setIsLoading(false);
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Best & Worst Symbols</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Which symbols performed best and worst
        </p>
      </div>

      <Card>
        {data.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No symbol data available
          </div>
        ) : (
          <div className="space-y-2">
            {data.map((s) => (
              <div key={s.symbol} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <span className="font-medium text-gray-900 dark:text-white">{s.symbol}</span>
                <span className={`font-semibold ${s.netPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {s.netPnL >= 0 ? '+' : ''}{s.netPnL.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}