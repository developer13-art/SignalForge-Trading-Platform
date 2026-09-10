import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSignalSourceStore } from '../../stores/signalSource.store';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  SourceIcon,
  CheckIcon,
  ClockIcon,
  PlusIcon,
} from '../../components/ui/icons';
import { Spinner } from '../../components/ui/Spinner';

export function SignalSources() {
  const { sources, telegramStatus, fetchSources, fetchTelegramStatus, isLoading } = useSignalSourceStore();

  useEffect(() => {
    fetchSources();
    fetchTelegramStatus();
  }, [fetchSources, fetchTelegramStatus]);

  if (isLoading && sources.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Signal Sources</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Connect and manage your trading signal sources
          </p>
        </div>
        <Link to="/signal-sources/add">
          <Button>
            <PlusIcon size={18} />
            Add Source
          </Button>
        </Link>
      </div>

      {/* Telegram Connection Card */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <SourceIcon size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Telegram</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Connect via user session to monitor channels and groups
              </p>
              <div className="mt-2">
                {telegramStatus?.isConnected ? (
                  <Badge variant="success" dot>
                    Connected
                  </Badge>
                ) : (
                  <Badge variant="neutral">Not Connected</Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {telegramStatus?.isConnected ? (
              <Link to="/signal-sources/telegram">
                <Button variant="outline">Manage</Button>
              </Link>
            ) : (
              <Link to="/signal-sources/telegram/connect">
                <Button>Connect Telegram</Button>
              </Link>
            )}
          </div>
        </div>
      </Card>

      {/* Sources List */}
      {sources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sources.map((source) => (
            <Card key={source.id} hoverable>
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                  <SourceIcon size={20} className="text-primary-600 dark:text-primary-400" />
                </div>
                <Badge variant={source.isActive ? 'success' : 'neutral'} dot>
                  {source.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{source.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{source.sourceType}</p>
              <div className="mt-4 flex gap-2">
                <Link to={`/signal-sources/${source.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    View
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <SourceIcon size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No Signal Sources</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Connect your first signal source to get started
            </p>
            <Link to="/signal-sources/add">
              <Button className="mt-4">
                <PlusIcon size={18} />
                Add Source
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}