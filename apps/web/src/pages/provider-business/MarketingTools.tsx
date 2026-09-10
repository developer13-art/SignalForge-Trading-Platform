import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AnalyticsIcon, CopyIcon, LinkIcon, SignalIcon } from '../../components/ui/icons';
import toast from 'react-hot-toast';

export function MarketingTools() {
  const copyReferralLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/marketplace/providers/me`);
    toast.success('Link copied');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Marketing Tools</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Promote your provider profile
        </p>
      </div>

      <Card>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-3">
              <LinkIcon size={20} className="text-primary-600" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Provider Link</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Share your profile</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={copyReferralLink}>
              <CopyIcon size={14} /> Copy
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-3">
              <SignalIcon size={20} className="text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Embed Widget</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Add to your website</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Get Code</Button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-3">
              <AnalyticsIcon size={20} className="text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Performance Badge</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Share your verified stats</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Generate</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}