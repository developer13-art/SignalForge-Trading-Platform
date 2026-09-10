import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import { ArrowLeftIcon, TradingIcon } from '../../components/ui/icons';
import { tradeService, Trade } from '../../services/trade.service';
import toast from 'react-hot-toast';

export function TradeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trade, setTrade] = useState<Trade | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) tradeService.getById(id).then(setTrade).finally(() => setIsLoading(false));
  }, [id]);

  const handleClose = async () => {
    if (!id) return;
    try {
      await tradeService.close(id);
      toast.success('Trade closed');
      navigate('/trading');
    } catch {
      toast.error('Failed to close');
    }
  };

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;
  if (!trade) return <div>Trade not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/trading')} className="text-gray-400 hover:text-gray-600">
          <ArrowLeftIcon size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{trade.symbol} Trade</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {new Date(trade.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Trade Details</h3>
          <div className="space-y-3">
            <Row label="Symbol" value={trade.symbol} />
            <Row label="Direction" value={<Badge variant={trade.direction === 'BUY' ? 'success' : 'danger'}>{trade.direction}</Badge>} />
            <Row label="Volume" value={trade.volume} />
            <Row label="Entry Price" value={trade.entryPrice} />
            <Row label="Stop Loss" value={trade.stopLoss} />
            <Row label="Take Profit" value={trade.takeProfit} />
            <Row label="Status" value={<Badge variant={trade.status === 'OPEN' ? 'info' : 'neutral'}>{trade.status}</Badge>} />
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Performance</h3>
          <div className="text-center py-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Realized P&L</p>
            <p className={`text-3xl font-bold mt-2 ${(trade.realizedProfit || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {(trade.realizedProfit || 0) >= 0 ? '+' : ''}{(trade.realizedProfit || 0).toFixed(2)}
            </p>
          </div>

          {trade.status === 'OPEN' && (
            <div className="mt-6">
              <Button variant="danger" onClick={handleClose} className="w-full">
                Close Position
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-sm font-medium text-gray-900 dark:text-white">{value || '-'}</span>
    </div>
  );
}