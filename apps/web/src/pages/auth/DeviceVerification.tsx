import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { MonitorIcon } from '../../components/ui/icons';
import toast from 'react-hot-toast';

export function DeviceVerification() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise(r => setTimeout(r, 800));
      toast.success('Device verified');
      navigate('/dashboard');
    } catch {
      toast.error('Invalid code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card p-8">
      <div className="text-center mb-6">
        <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <MonitorIcon size={28} className="text-primary-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Verify New Device</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          We sent a verification code to your email for security
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Device Verification Code"
          placeholder="000000"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={6}
          required
        />
        <Button type="submit" isLoading={isLoading} className="w-full">Verify Device</Button>
      </form>

      <div className="mt-6 text-center">
        <button className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
          This wasn't me — secure my account
        </button>
      </div>
    </div>
  );
}