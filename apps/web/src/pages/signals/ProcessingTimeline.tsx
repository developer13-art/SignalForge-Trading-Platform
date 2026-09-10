import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Spinner } from '../../components/ui/Spinner';
import { Button } from '../../components/ui/Button';
import {
  SignalIcon, CheckIcon, ArrowLeftIcon, ClockIcon, KycIcon, TradingIcon, ShieldIcon,
} from '../../components/ui/icons';
import { signalService, Signal } from '../../services/signal.service';

interface TimelineStep {
  label: string;
  description: string;
  timestamp?: string;
  done: boolean;
  actor?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export function ProcessingTimeline() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [signal, setSignal] = useState<Signal | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      signalService.getById(id).then(setSignal).finally(() => setIsLoading(false));
    }
  }, [id]);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;
  if (!signal) return <div>Signal not found</div>;

  const isExecuted = signal.status === 'EXECUTED';
  const isValidated = ['VALIDATED', 'EXECUTED', 'APPROVED'].includes(signal.status);

  const steps: TimelineStep[] = [
    {
      label: 'Signal Received',
      description: 'Raw message captured from source',
      timestamp: signal.createdAt,
      done: true,
      actor: 'SYSTEM',
      icon: SignalIcon,
    },
    {
      label: 'Parsed',
      description: 'AI extracted structured data',
      timestamp: signal.createdAt,
      done: true,
      actor: 'AI',
      icon: KycIcon,
    },
    {
      label: 'Risk Checked',
      description: 'Validated against risk profile',
      timestamp: signal.createdAt,
      done: isValidated,
      actor: 'RISK ENGINE',
      icon: ShieldIcon,
    },
    {
      label: 'Validated',
      description: 'Passed all validation checks',
      timestamp: isValidated ? signal.createdAt : undefined,
      done: isValidated,
      actor: 'VALIDATOR',
      icon: CheckIcon,
    },
    {
      label: 'Executed',
      description: 'Order sent to broker',
      timestamp: isExecuted ? signal.createdAt : undefined,
      done: isExecuted,
      actor: 'EXECUTION',
      icon: TradingIcon,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(`/signals/${id}`)} className="text-gray-400 hover:text-gray-600">
          <ArrowLeftIcon size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Processing Timeline</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {signal.symbol} • {signal.direction}
          </p>
        </div>
      </div>

      <Card>
        <div className="space-y-1">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            return (
              <div key={step.label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    step.done ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                  }`}>
                    {step.done ? <CheckIcon size={20} /> : <Icon size={20} />}
                  </div>
                  {!isLast && (
                    <div className={`w-0.5 flex-1 min-h-[40px] ${step.done ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex items-center justify-between">
                    <p className={`font-medium ${step.done ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                      {step.label}
                    </p>
                    {step.actor && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">{step.actor}</span>
                    )}
                  </div>
                  <p className={`text-sm mt-0.5 ${step.done ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400'}`}>
                    {step.description}
                  </p>
                  {step.timestamp && (
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <ClockIcon size={12} />
                      {new Date(step.timestamp).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}