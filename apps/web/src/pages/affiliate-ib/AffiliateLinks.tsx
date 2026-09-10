import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { CopyIcon, PlusIcon, LinkIcon } from '../../components/ui/icons';
import toast from 'react-hot-toast';

export function AffiliateLinks() {
  const copy = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success('Copied');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Affiliate Links</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your tracking links
          </p>
        </div>
        <Button>
          <PlusIcon size={18} /> New Link
        </Button>
      </div>

      <Card>
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <LinkIcon size={48} className="mx-auto mb-4 text-gray-400" />
          No affiliate links yet
        </div>
      </Card>
    </div>
  );
}