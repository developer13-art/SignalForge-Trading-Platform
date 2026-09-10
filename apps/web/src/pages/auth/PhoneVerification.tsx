import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { PhoneIcon } from '../../components/ui/icons';
import toast from 'react-hot-toast';

export function PhoneVerification() {
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Send OTP
      await new Promise(r => setTimeout(r, 800));
      setStep('code');
      toast.success('OTP sent');
    } catch {
      toast.error('Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise(r => setTimeout(r, 800));
      toast.success('Phone verified');
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
          <PhoneIcon size={28} className="text-primary-600 dark:text-primary-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Verify Phone</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {step === 'phone' ? 'Enter your phone number' : 'Enter the OTP sent to your phone'}
        </p>
      </div>

      {step === 'phone' ? (
        <form onSubmit={handlePhoneSubmit} className="space-y-4">
          <Input
            label="Phone Number"
            placeholder="+1234567890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Button type="submit" isLoading={isLoading} className="w-full">Send OTP</Button>
        </form>
      ) : (
        <form onSubmit={handleCodeSubmit} className="space-y-4">
          <Input
            label="Verification Code"
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <Button type="submit" isLoading={isLoading} className="w-full">Verify</Button>
          <button type="button" onClick={() => setStep('phone')} className="w-full text-sm text-gray-500 dark:text-gray-400 hover:underline">
            Change phone number
          </button>
        </form>
      )}
    </div>
  );
}