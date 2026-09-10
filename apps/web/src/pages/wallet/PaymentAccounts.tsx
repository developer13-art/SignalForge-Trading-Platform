import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { WalletIcon, PlusIcon } from '../../components/ui/icons';

export function PaymentAccounts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Accounts</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Linked bank and payment accounts
          </p>
        </div>
        <Button>
          <PlusIcon size={18} /> Add Account
        </Button>
      </div>

      <Card>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <WalletIcon size={24} className="text-gray-400" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No payment accounts linked yet.
          </p>
        </div>
      </Card>
    </div>
  );
}