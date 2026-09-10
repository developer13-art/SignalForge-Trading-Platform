import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { UploadIcon, CheckIcon } from '../../components/ui/icons';
import toast from 'react-hot-toast';

export function ImportHistoricalMessages() {
  const [file, setFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleImport = async () => {
    if (!file) {
      toast.error('Please select a file');
      return;
    }
    setIsImporting(true);
    try {
      await new Promise(r => setTimeout(r, 1500));
      toast.success('Messages imported');
    } catch {
      toast.error('Import failed');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Import Historical Messages</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Upload 300-1000 historical signals to train your DNA
        </p>
      </div>

      <Card>
        <div
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center cursor-pointer hover:border-primary-500 transition-colors"
          onClick={() => document.getElementById('file-input')?.click()}
        >
          {file ? (
            <div className="flex items-center justify-center gap-3">
              <CheckIcon size={20} className="text-green-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{file.name}</span>
            </div>
          ) : (
            <>
              <UploadIcon size={32} className="text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Click to upload CSV or JSON with historical messages
              </p>
            </>
          )}
          <input
            id="file-input"
            type="file"
            accept=".csv,.json,.txt"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={handleImport} isLoading={isImporting} disabled={!file}>
            Import Messages
          </Button>
        </div>
      </Card>
    </div>
  );
}