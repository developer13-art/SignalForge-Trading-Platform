import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import { CopyIcon, CheckIcon, LinkIcon } from '../../components/ui/icons';
import { referralService } from '../../services/referral.service';
import toast from 'react-hot-toast';

export function ReferralLink() {
  const [link, setLink] = useState('');
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    referralService.getDashboard().then((data) => {
      setLink(data.referralLink);
      setCode(data.referralCode);
    }).finally(() => setIsLoading(false));
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success('Referral link copied');
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Referral Link</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Share this link to earn rewards
        </p>
      </div>

      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
            <LinkIcon size={20} className="text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Referral Link</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Copy and share with friends</p>
          </div>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={link}
            className="flex-1 input-field font-mono text-sm"
          />
          <Button onClick={copyLink}>
            {copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your referral code: <span className="font-mono font-semibold text-gray-900 dark:text-white">{code}</span>
          </p>
        </div>
      </Card>
    </div>
  );
}