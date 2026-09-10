import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import { signalService, Signal } from '../../services/signal.service';
import { ArrowLeftIcon, SignalIcon, CheckIcon } from '../../components/ui/icons';

export function SignalDetails() {
  const { id } = useParams<{ id: string }>();
  const [signal, setSignal] = useState<Signal | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      signalService.getById(id).then(setSignal).finally(() => setIsLoading(false));
    }
  }, [id]);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;
  if (!signal) return <div>Signal not found</div>;

  const timeline = [
    { label: 'Signal Received', done: true, time: signal.createdAt },
    { label: 'AI Parsed', done: true, time: signal.createdAt },
    { label: 'Risk Checked', done: signal.status !== 'RAW', time: signal.createdAt },
    { label: 'Validated', done: signal.status === 'VALIDATED' || signal.status === 'EXECUTED', time: signal.createdAt },
    { label: 'Executed', done: signal.status === 'EXECUTED', time: signal.createdAt },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/signals">
          <Button variant="ghost" size="sm">
            <ArrowLeftIcon size={16} />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Signal Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                  signal.direction === 'BUY' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                }`}>
                  <SignalIcon size={32} className={
                    signal.direction === 'BUY' ? 'text-green-600' : 'text-red-600'
                  } />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{signal.symbol}</h2>
                  <div className="flex gap-2 mt-2">
                    <Badge variant={signal.direction === 'BUY' ? 'success' : 'danger'}>
                      {signal.direction}
                    </Badge>
                    <Badge variant="primary">{signal.status}</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <DetailRow label="Entry Type" value={signal.entryType} />
              <DetailRow label="Entry Price" value={signal.entryPrice} />
              <DetailRow label="Stop Loss" value={signal.stopLoss} />
              <DetailRow label="Take Profit 1" value={signal.takeProfit1} />
              <DetailRow label="Take Profit 2" value={signal.takeProfit2} />
              <DetailRow label="Take Profit 3" value={signal.takeProfit3} />
              <DetailRow label="Confidence" value={signal.confidence ? `${signal.confidence.toFixed(1)}%` : null} />
              <DetailRow label="Timeframe" value={signal.timeframe} />
            </div>

            {signal.rawText && (
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">Original Message</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{signal.rawText}</p>
              </div>
            )}
          </Card>
        </div>

        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Processing Timeline</h3>
          <div className="space-y-4">
            {timeline.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                  step.done ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
                }`}>
                  {step.done && <CheckIcon size={14} />}
                </div>
                <div>
                  <p className={`text-sm font-medium ${step.done ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                    {step.label}
                  </p>
                  {step.time && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(step.time).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">{label}</p>
      <p className="text-sm font-medium text-gray-900 dark:text-white">{value || '-'}</p>
    </div>
  );
}