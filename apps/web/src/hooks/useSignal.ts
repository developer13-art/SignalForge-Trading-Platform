import { useState } from 'react';
import { signalService, Signal } from '../services/signal.service';

export function useSignal() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadLive = async () => {
    setIsLoading(true);
    try {
      const data = await signalService.getLive();
      setSignals(data);
    } finally {
      setIsLoading(false);
    }
  };

  const loadHistory = async () => {
    setIsLoading(true);
    try {
      const data = await signalService.getHistory();
      setSignals(data);
    } finally {
      setIsLoading(false);
    }
  };

  return { signals, isLoading, loadLive, loadHistory };
}