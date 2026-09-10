import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Progress } from '../../components/ui/Progress';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import { ArrowLeftIcon, AlertIcon, CheckIcon } from '../../components/ui/icons';
import { signalService, Signal } from '../../services/signal.service';

export function SignalConfidence() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [signal, setSignal] = useState<Signal | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) signalService.getById(id).then(setSignal).finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;
  if (!signal) return <div>Signal not found</div>;

  const confidence = signal.confidence || 0;
  const confidencePercent = Math.round(confidence * 100);
  const level =
    confidencePercent >= 90 ? { label: 'Very High', variant: 'success' as const } :
    confidencePercent >= 75 ? { label: 'High', variant: 'success' as const } :
    confidencePercent >= 60 ? { label: 'Medium', variant: 'warning' as const } :
    { label: 'Low', variant: 'danger' as const };

  const factors = [
    { label: 'Symbol Detection', value: signal.symbol ? 100 : 0 },
    { label: 'Direction Detection', value: signal.direction ? 100 : 0 },
    { label: 'Stop Loss Present', value: signal.stopLoss ? 100 : 0 },
    { label: 'Take Profit Present', value: signal.takeProfit1 ? 100 : 0 },
    { label: 'Entry Price Present', value: signal.entryPrice ? 100 : 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(`/signals/${id}`)} className="text-gray-400 hover:text-gray-600">
          <ArrowLeftIcon size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Signal Confidence</h1>
        </div>
      </div>

      <Card>
        <div className="text-center py-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Overall Confidence</p>
          <p className="text-6xl font-extrabold text-primary-600 dark:text-primary-400">{confidencePercent}%</p>
          <div className="mt-3">
            <Badge variant={level.variant} size="lg">{level.label}</Badge>
          </div>
          <Progress value={confidencePercent} max={100} variant={level.variant === 'success' ? 'success' : level.variant === 'warning' ? 'warning' : 'danger'} className="mt-6 max-w-md mx-auto" />
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Confidence Factors</h3>
        <div className="space-y-3">
          {factors.map((f) => (
            <div key={f.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-700 dark:text-gray-300">{f.label}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{f.value}%</span>
              </div>
              <Progress value={f.value} max={100} variant={f.value === 100 ? 'success' : 'warning'} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}