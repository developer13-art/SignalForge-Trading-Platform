import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { DownloadIcon, AuditIcon } from '../../components/ui/icons';
import toast from 'react-hot-toast';

const reports = [
  'Income Statement',
  'Cash Flow Report',
  'Revenue Breakdown',
  'Cost Analysis',
  'Profit & Loss Statement',
  'Tax Report',
];

export function FinancialReports() {
  const handleGenerate = (name: string) => toast.success(`${name} generated`);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Reports</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Download financial statements</p>
      </div>

      <Card>
        <div className="space-y-3">
          {reports.map((r) => (
            <div key={r} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center gap-3">
                <AuditIcon size={20} className="text-primary-600" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{r}</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleGenerate(r)}>
                <DownloadIcon size={14} /> Generate
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}