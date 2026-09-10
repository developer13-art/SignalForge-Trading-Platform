import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { TrendingUpIcon, TrendingDownIcon } from '../ui/icons';

interface TradeCardProps {
  symbol: string;
  direction: 'BUY' | 'SELL';
  volume: number;
  entryPrice: number;
  currentPrice?: number;
  profit: number;
  status: string;
  openedAt: string;
  onClick?: () => void;
}

export function TradeCard({
  symbol,
  direction,
  volume,
  entryPrice,
  currentPrice,
  profit,
  status,
  openedAt,
  onClick,
}: TradeCardProps) {
  const profitColor = profit >= 0 ? 'text-green-600' : 'text-red-600';

  return (
    <Card hoverable={!!onClick} onClick={onClick}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            profit >= 0 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
          }`}>
            {profit >= 0 ? <TrendingUpIcon size={20} className="text-green-600" /> : <TrendingDownIcon size={20} className="text-red-600" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900 dark:text-white">{symbol}</span>
              <Badge variant={direction === 'BUY' ? 'success' : 'danger'}>{direction}</Badge>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {volume} lots @ {entryPrice}
            </p>
          </div>
        </div>
        <Badge variant={status === 'OPEN' ? 'info' : status === 'CLOSED' ? 'neutral' : 'warning'}>
          {status}
        </Badge>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">P&L</p>
          <p className={`text-lg font-bold ${profitColor}`}>
            {profit >= 0 ? '+' : ''}{profit.toFixed(2)}
          </p>
        </div>
        {currentPrice && (
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400">Current</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{currentPrice}</p>
          </div>
        )}
      </div>
    </Card>
  );
}