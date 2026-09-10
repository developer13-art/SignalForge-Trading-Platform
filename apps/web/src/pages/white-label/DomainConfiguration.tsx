import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { GlobeIcon, CheckIcon } from '../../components/ui/icons';
import toast from 'react-hot-toast';

export function DomainConfiguration() {
  const [domain, setDomain] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    if (!domain) {
      toast.error('Enter a domain');
      return;
    }
    setIsVerifying(true);
    try {
      await new Promise(r => setTimeout(r, 1500));
      toast.success('Domain verification initiated');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Domain Configuration</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Configure your custom domain
        </p>
      </div>

      <Card>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center shrink-0">
            <GlobeIcon size={24} className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Custom Domain</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Point your domain to SignalForge via CNAME record
            </p>
          </div>
        </div>

        <Input
          label="Domain"
          placeholder="app.yourbrand.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />

        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">DNS Instructions</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 font-mono">
            CNAME app.yourbrand.com → cname.signalforge.ai
          </p>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={handleVerify} isLoading={isVerifying}>
            Verify Domain
          </Button>
        </div>
      </Card>
    </div>
  );
}