import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import { ArrowLeftIcon, RefreshIcon, TrashIcon, TradingIcon } from '../../components/ui/icons';
import { brokerService, BrokerAccount } from '../../services/broker.service';
import toast from 'react-hot-toast';

export function AccountDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [account, setAccount] = useState<BrokerAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) brokerService.getAccount(id).then(setAccount).finally(() => setIsLoading(false));
  }, [id]);

  const handleSync = async () => {
    if (!id) return;
    try {
      await brokerService.sync(id);
      toast.success('Synced');
      brokerService.getAccount(id).then(setAccount);
    } catch {
      toast.error('Sync failed');
    }
  };

  const handleDisconnect = async () => {
    if (!id || !confirm('Disconnect this account?')) return;
    try {
      await brokerService.disconnect(id);
      toast.success('Disconnected');
      navigate('/brokers');
    } catch {
      toast.error('Failed to disconnect');
    }
  };

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;
  if (!account) return <div>Account not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/brokers')} className="text-gray-400 hover:text-gray-600">
          <ArrowLeftIcon size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{account.nickname}</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {account.platform} • {account.server}
          </p>
        </div>
        <Badge variant={account.status === 'CONNECTED' ? 'success' : 'warning'} dot>
          {account.status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Balance</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            ${account.balance.toFixed(2)}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Equity</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            ${account.equity.toFixed(2)}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Margin</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            ${account.margin.toFixed(2)}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Free Margin</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            ${account.freeMargin.toFixed(2)}
          </p>
        </Card>
      </div>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Account Information</h3>
        <div className="space-y-3">
          <Row label="Broker" value={account.broker?.name || '-'} />
          <Row label="Platform" value={account.platform} />
          <Row label="Server" value={account.server} />
          <Row label="Account Type" value={<Badge variant={account.accountType === 'LIVE' ? 'danger' : 'info'}>{account.accountType}</Badge>} />
          <Row label="Currency" value={account.currency || '-'} />
          <Row label="Last Sync" value={account.lastSyncAt ? new Date(account.lastSyncAt).toLocaleString() : 'Never'} />
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={handleSync}>
            <RefreshIcon size={18} />
            Sync Now
          </Button>
          <Button variant="outline">
            <TradingIcon size={18} />
            View Trades
          </Button>
          <Button variant="danger" onClick={handleDisconnect}>
            <TrashIcon size={18} />
            Disconnect
          </Button>
        </div>
      </Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-sm font-medium text-gray-900 dark:text-white">{value}</span>
    </div>
  );
}