import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { ArrowRightIcon, SignalIcon, TradingIcon, AiIcon, ShieldIcon, MonitorIcon, SourceIcon, AuditIcon } from '../../components/ui/icons';

const replayTypes = [
  { icon: TradingIcon, title: 'Trade Replay', description: 'Full trade lifecycle', link: '/replay/trade' },
  { icon: SignalIcon, title: 'Signal Replay', description: 'Signal processing pipeline', link: '/replay/signal' },
  { icon: AiIcon, title: 'AI Processing Replay', description: 'AI parsing and decisions', link: '/replay/ai' },
  { icon: ShieldIcon, title: 'Risk Decision Replay', description: 'Risk evaluation trace', link: '/replay/risk' },
  { icon: MonitorIcon, title: 'Execution Replay', description: 'MetaApi execution flow', link: '/replay/execution' },
  { icon: SourceIcon, title: 'Provider Message Replay', description: 'Original provider message', link: '/replay/provider-message' },
  { icon: AuditIcon, title: 'System Event Timeline', description: 'All platform events', link: '/replay/events' },
];

export function ReplayCenter() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Replay Center</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Reconstruct any trade, signal, or decision end-to-end
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {replayTypes.map((r) => {
          const Icon = r.icon;
          return (
            <Link key={r.title} to={r.link}>
              <Card hoverable>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{r.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{r.description}</p>
                  </div>
                  <ArrowRightIcon size={16} className="text-gray-400 shrink-0 mt-1" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}