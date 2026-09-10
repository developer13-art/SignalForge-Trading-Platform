import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { ShieldIcon, CopyIcon } from '../../components/ui/icons';
import toast from 'react-hot-toast';

export function TwoFactorAuthentication() {
  const [step, setStep] = useState<'setup' | 'verify' | 'complete'>('setup');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const secret = 'JBSWY3DPEHPK3PXP';
  const qrUrl = `otpauth://totp/SignalForge:user@example.com?secret=${secret}&issuer=SignalForge`;

  const copySecret = () => {
    navigator.clipboard.writeText(secret);
    toast.success('Secret copied');
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise(r => setTimeout(r, 800));
      setStep('complete');
      toast.success('2FA enabled');
    } catch {
      toast.error('Invalid code');
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'complete') {
    return (
      <div className="card p-8 text-center">
        <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldIcon size={28} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">2FA Enabled</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Two-factor authentication is now active on your account.
        </p>
      </div>
    );
  }

  return (
    <div className="card p-8">
      <div className="text-center mb-6">
        <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldIcon size={28} className="text-primary-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Setup 2FA</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Scan the QR code with your authenticator app
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="w-48 h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">QR Code</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center">
          Or enter this code manually
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={secret}
            className="flex-1 input-field font-mono text-sm text-center"
          />
          <Button variant="outline" size="sm" onClick={copySecret}>
            <CopyIcon size={16} />
          </Button>
        </div>
      </div>

      <form onSubmit={handleVerify} className="space-y-4">
        <Input
          label="Verification Code"
          placeholder="000000"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={6}
          required
        />
        <Button type="submit" isLoading={isLoading} className="w-full">Verify & Enable</Button>
      </form>
    </div>
  );
}