import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { WalletIcon, ArrowRightIcon } from '../../components/ui/icons';
import { useNavigate } from 'react-router-dom';

export function AvailableBalance() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Available Balance</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Funds available for immediate use
        </p>
      </div>

      <Card>
        <div className="text-center py-8">
          <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <WalletIcon size={28} className="text-green-600" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Available Balance</p>
          <p className="text-4xl font-bold text-gray-900 dark:text-white mt-2">$0.00</p>
          <div className="mt-6 flex gap-3 justify-center">
            <Button onClick={() => navigate('/wallet/withdraw')}>
              Withdraw <ArrowRightIcon size={18} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}