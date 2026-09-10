import { useState } from 'react';
import { tradeService, Trade } from '../services/trade.service';

export function useTrade() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadTrades = async () => {
    setIsLoading(true);
    try {
      const data = await tradeService.getHistory();
      setTrades(data);
    } finally {
      setIsLoading(false);
    }
  };

  const closeTrade = async (id: string, volume?: number) => {
    await tradeService.close(id, volume);
    await loadTrades();
  };

  return { trades, isLoading, loadTrades, closeTrade };
}