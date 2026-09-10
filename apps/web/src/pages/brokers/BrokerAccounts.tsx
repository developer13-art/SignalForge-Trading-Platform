import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { brokerService, BrokerAccount } from '../../services/broker.service';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import {
  BrokerIcon,
  PlusIcon,
  RefreshIcon,
  CheckIcon,
  AlertIcon,
} from '../../components/ui/icons';
import toast from 'react-hot-toast';

export function BrokerAccounts() {
  const [accounts, setAccounts] = useState<BrokerAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAccounts = () => {
    brokerService.getAccounts()
      .then(setAccounts)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const handleSync = async (accountId: string) => {
    try {
      await brokerService.sync(accountId);
      toast.success('Account synced');
      loadAccounts();
    } catch (error) {
      toast.error('Sync failed');
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Broker Accounts</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your connected MT4/MT5 accounts
          </p>
        </div>
        <Link to="/brokers/connect">
          <Button>
            <PlusIcon size={18} />
            Connect Broker
          </Button>
        </Link>
      </div>

      {accounts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((account) => (
            <Card key={account.id} hoverable>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                    <BrokerIcon size={20} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{account.nickname}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {account.platform} • {account.server}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={
                    account.status === 'CONNECTED' ? 'success' :
                    account.status === 'ERROR' ? 'danger' : 'warning'
                  }
                  dot
                >
                  {account.status}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Balance</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${account.balance.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Equity</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${account.equity.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Type</span>
                  <Badge variant={account.accountType === 'LIVE' ? 'danger' : 'info'}>
                    {account.accountType}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSync(account.id)}
                  className="flex-1"
                >
                  <RefreshIcon size={16} />
                  Sync
                </Button>
                <Link to={`/brokers/${account.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">Details</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <BrokerIcon size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No Broker Accounts</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Connect your first MT4/MT5 account to enable automated trading
            </p>
            <Link to="/brokers/connect">
              <Button className="mt-4">
                <PlusIcon size={18} />
                Connect Broker
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}