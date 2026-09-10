import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { CheckIcon, AlertIcon, ArrowLeftIcon, ShieldIcon } from '../../components/ui/icons';
import { signalService, Signal } from '../../services/signal.service';

const mockChecks = [
  { name: 'Signal Validity', passed: true, severity: 'LOW', message: 'Signal contains valid symbol and direction' },
  { name: 'Daily Loss Limit', passed: true, severity: 'HIGH', message: 'Daily loss within limit' },
  { name: 'Max Open Trades', passed: true, severity: 'MEDIUM', message: 'Open trades within limit' },
  { name: 'Trading Session', passed: true, severity: 'HIGH', message: 'Within trading hours' },
  { name: 'Duplicate Check', passed: true, severity: 'MEDIUM', message: 'No duplicates found' },
  { name: 'Margin Level', passed: true, severity: 'HIGH', message: 'Margin level safe' },
];

export function SignalRiskAnalysis() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [signal, setSignal] = useState<Signal | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) signalService.getById(id).then(setSignal).finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;
  if (!signal) return <div>Signal not found</div>;

  const passedCount = mockChecks.filter(c => c.passed).length;
  const overallScore = (passedCount / mockChecks.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(`/signals/${id}`)} className="text-gray-400 hover:text-gray-600">
          <ArrowLeftIcon size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Risk Analysis</h1>
        </div>
      </div>

      <Card>
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
            <ShieldIcon size={28} className="text-primary-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">Overall Risk Score</h3>
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mt-1">
              {Math.round(overallScore)}%
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {passedCount} of {mockChecks.length} checks passed
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Risk Checks</h3>
        <div className="space-y-3">
          {mockChecks.map((check) => (
            <div key={check.name} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                check.passed ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}>
                {check.passed ? <CheckIcon size={14} /> : <AlertIcon size={14} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{check.name}</p>
                  <Badge variant={
                    check.severity === 'HIGH' || check.severity === 'CRITICAL' ? 'danger' :
                    check.severity === 'MEDIUM' ? 'warning' : 'info'
                  }>
                    {check.severity}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{check.message}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}