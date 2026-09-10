import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignalSourceStore } from '../../stores/signalSource.store';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { PhoneIcon, LockIcon, ArrowRightIcon, CheckIcon } from '../../components/ui/icons';
import toast from 'react-hot-toast';

type Step = 'phone' | 'code' | 'password' | 'success';

export function TelegramConnection() {
  const [step, setStep] = useState<Step>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [phoneCodeHash, setPhoneCodeHash] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { initiateTelegram, verifyTelegram } = useSignalSourceStore();
  const navigate = useNavigate();

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await initiateTelegram(`${countryCode}${phoneNumber}`, countryCode);
    
    if (result) {
      setPhoneCodeHash(result.phoneCodeHash);
      setStep('code');
      toast.success('OTP sent to your Telegram app');
    } else {
      toast.error('Failed to initiate connection');
    }

    setIsLoading(false);
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await verifyTelegram({
      phoneNumber: `${countryCode}${phoneNumber}`,
      phoneCodeHash,
      code,
      password: password || undefined,
    });

    if (success) {
      setStep('success');
      toast.success('Telegram connected successfully');
      setTimeout(() => navigate('/signal-sources'), 1500);
    } else {
      toast.error('Invalid code. Please try again.');
    }

    setIsLoading(false);
  };

  if (step === 'success') {
    return (
      <div className="max-w-md mx-auto">
        <Card>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckIcon size={32} className="text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Connected Successfully</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Your Telegram account is now connected to SignalForge
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
            <PhoneIcon size={24} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Connect Telegram</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {step === 'phone' && 'Enter your phone number to receive a code'}
            {step === 'code' && 'Enter the code sent to your Telegram app'}
          </p>
        </div>

        {step === 'phone' && (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <Input
                label="Code"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                placeholder="+1"
              />
              <div className="col-span-2">
                <Input
                  label="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="1234567890"
                  required
                />
              </div>
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full">
              Send Code
              <ArrowRightIcon size={18} />
            </Button>
          </form>
        )}

        {step === 'code' && (
          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <Input
              label="Verification Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter 5-digit code"
              leftIcon={<LockIcon size={18} />}
              required
            />

            <Input
              label="2FA Password (optional)"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter 2FA password if enabled"
              leftIcon={<LockIcon size={18} />}
            />

            <Button type="submit" isLoading={isLoading} className="w-full">
              Verify & Connect
              <CheckIcon size={18} />
            </Button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              Back to phone number
            </button>
          </form>
        )}
      </Card>
    </div>
  );
}