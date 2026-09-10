import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import { PlayIcon, PauseIcon, StopIcon, ArrowLeftIcon } from '../../components/ui/icons';
import { signalService, Signal } from '../../services/signal.service';

const replayEvents = [
  { time: 0, label: 'Message received', type: 'RECEIVED' },
  { time: 500, label: 'Signal detected', type: 'DETECTED' },
  { time: 1000, label: 'AI extraction complete', type: 'PARSED' },
  { time: 1500, label: 'Provider DNA matched', type: 'DNA' },
  { time: 2000, label: 'Validation passed', type: 'VALIDATED' },
  { time: 2500, label: 'Risk check passed', type: 'RISK' },
  { time: 3000, label: 'Execution requested', type: 'EXECUTION' },
  { time: 3500, label: 'MetaApi accepted order', type: 'BROKER' },
];

export function SignalReplay() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [signal, setSignal] = useState<Signal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const maxTime = replayEvents[replayEvents.length - 1].time;

  useEffect(() => {
    if (id) signalService.getById(id).then(setSignal).finally(() => setIsLoading(false));
  }, [id]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + 100;
        if (next >= maxTime) {
          setIsPlaying(false);
          return maxTime;
        }
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying, maxTime]);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;
  if (!signal) return <div>Signal not found</div>;

  const visibleEvents = replayEvents.filter((e) => e.time <= currentTime);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(`/signals/${id}`)} className="text-gray-400 hover:text-gray-600">
          <ArrowLeftIcon size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Signal Replay</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {signal.symbol} • Reconstruct the complete timeline
          </p>
        </div>
      </div>

      <Card>
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => { setCurrentTime(0); setIsPlaying(false); }}
          >
            <StopIcon size={16} /> Reset
          </Button>
          <Button
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <><PauseIcon size={16} /> Pause</> : <><PlayIcon size={16} /> Play</>}
          </Button>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {currentTime}ms / {maxTime}ms
          </span>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all"
            style={{ width: `${(currentTime / maxTime) * 100}%` }}
          />
        </div>

        <div className="space-y-2">
          {visibleEvents.map((event, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 animate-fade-in">
              <span className="text-xs font-mono text-gray-500 dark:text-gray-400 w-16">
                {event.time}ms
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-primary-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{event.label}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}