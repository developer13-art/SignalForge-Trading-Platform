import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { SignalIcon } from '../ui/icons';

interface SignalCardProps {
  symbol: string;
  direction: 'BUY' | 'SELL';
  entryPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  confidence?: number;
  timestamp: string;
  providerName?: string;
  onClick?: () => void;
}

export function SignalCard({
  symbol,
  direction,
  entryPrice,
  stopLoss,
  takeProfit,
  confidence,
  timestamp,
  providerName,
  onClick,
}: SignalCardProps) {
  return (
    <Card hoverable={!!onClick} onClick={onClick}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            direction === 'BUY' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
          }`}>
            <SignalIcon size={20} className={direction === 'BUY' ? 'text-green-600' : 'text-red-600'} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900 dark:text-white">{symbol}</span>
              <Badge variant={direction === 'BUY' ? 'success' : 'danger'}>{direction}</Badge>
            </div>
            {providerName && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{providerName}</p>}
          </div>
        </div>
        {confidence !== undefined && (
          <Badge variant="primary">{confidence.toFixed(0)}%</Badge>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        {entryPrice !== undefined && (
          <div>
            <p className="text-gray-500 dark:text-gray-400">Entry</p>
            <p className="font-medium text-gray-900 dark:text-white">{entryPrice}</p>
          </div>
        )}
        {stopLoss !== undefined && (
          <div>
            <p className="text-gray-500 dark:text-gray-400">SL</p>
            <p className="font-medium text-red-600">{stopLoss}</p>
          </div>
        )}
        {takeProfit !== undefined && (
          <div>
            <p className="text-gray-500 dark:text-gray-400">TP</p>
            <p className="font-medium text-green-600">{takeProfit}</p>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
        {new Date(timestamp).toLocaleString()}
      </p>
    </Card>
  );
}