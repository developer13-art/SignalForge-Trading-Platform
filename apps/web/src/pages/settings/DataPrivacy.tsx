import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { DownloadIcon, TrashIcon, AuditIcon } from '../../components/ui/icons';
import toast from 'react-hot-toast';

export function DataPrivacy() {
  const handleExport = () => toast.success('Data export started');
  const handleDelete = () => toast.error('Data deletion requires confirmation');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Data & Privacy</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your personal data
        </p>
      </div>

      <Card>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-3">
              <DownloadIcon size={20} className="text-primary-600" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Export My Data</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Download all your data as a ZIP file</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleExport}>
              Export
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-3">
              <AuditIcon size={20} className="text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Data Retention</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Your data is kept while your account is active</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}