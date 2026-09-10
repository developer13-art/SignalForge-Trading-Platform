import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { DownloadIcon } from '../../components/ui/icons';
import toast from 'react-hot-toast';

export function ExportReports() {
  const handleExport = (format: string) => {
    toast.success(`Exporting as ${format}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Export Reports</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Download your data in CSV or PDF
        </p>
      </div>

      <Card>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <span className="text-sm font-medium text-gray-900 dark:text-white">Trade History (CSV)</span>
            <Button variant="outline" size="sm" onClick={() => handleExport('CSV')}>
              <DownloadIcon size={16} /> Export
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <span className="text-sm font-medium text-gray-900 dark:text-white">Performance Report (PDF)</span>
            <Button variant="outline" size="sm" onClick={() => handleExport('PDF')}>
              <DownloadIcon size={16} /> Export
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <span className="text-sm font-medium text-gray-900 dark:text-white">Equity Curve (CSV)</span>
            <Button variant="outline" size="sm" onClick={() => handleExport('CSV')}>
              <DownloadIcon size={16} /> Export
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}