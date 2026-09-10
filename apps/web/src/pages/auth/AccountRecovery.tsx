import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { SecurityIcon } from '../../components/ui/icons';
import toast from 'react-hot-toast';

export function AccountRecovery() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise(r => setTimeout(r, 800));
      toast.success('Account recovery initiated');
    } catch {
      toast.error('Invalid recovery code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card p-8">
      <div className="text-center mb-6">
        <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <SecurityIcon size={28} className="text-primary-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Recovery</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Enter one of your recovery codes to regain access
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Recovery Code"
          placeholder="XXXX-XXXX"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <Button type="submit" isLoading={isLoading} className="w-full">Recover Account</Button>
      </form>

      <div className="mt-6 text-center">
        <Link to="/login" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
}