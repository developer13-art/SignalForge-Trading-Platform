import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { ArrowLeftIcon } from '../../components/ui/icons';
import apiClient from '../../api/client';
import toast from 'react-hot-toast';

export function WithdrawalRequest() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('bank');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Enter a valid amount');
      return;
    }
    setIsLoading(true);
    try {
      await apiClient.post('/wallet/withdraw', { amount: parseFloat(amount), method });
      toast.success('Withdrawal request submitted');
      navigate('/wallet/withdrawals');
    } catch (error: any) {
      toast.error(error?.response?.data?.error?.message || 'Failed to submit');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/wallet')} className="text-gray-400 hover:text-gray-600">
          <ArrowLeftIcon size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Request Withdrawal</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Amount (USD)"
            type="number"
            placeholder="100.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Select
            label="Withdrawal Method"
            options={[
              { value: 'bank', label: 'Bank Transfer' },
              { value: 'paystack', label: 'Paystack' },
            ]}
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-xs text-blue-700 dark:text-blue-400">
              Withdrawals require KYC verification and may take 1-3 business days to process.
            </p>
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full">
            Submit Withdrawal Request
          </Button>
        </form>
      </Card>
    </div>
  );
}