import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { UploadIcon, CheckIcon } from '../../components/ui/icons';
import toast from 'react-hot-toast';

export function LogoBranding() {
  const [logo, setLogo] = useState<File | null>(null);
  const [favicon, setFavicon] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(r => setTimeout(r, 500));
      toast.success('Logos updated');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Logo & Branding</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Upload your logos and branding assets
        </p>
      </div>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Primary Logo</h3>
        <div
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-primary-500 transition-colors"
          onClick={() => document.getElementById('logo-input')?.click()}
        >
          {logo ? (
            <div className="flex items-center justify-center gap-3">
              <CheckIcon size={20} className="text-green-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{logo.name}</span>
            </div>
          ) : (
            <>
              <UploadIcon size={32} className="text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                PNG, JPG, or SVG (max 2MB)
              </p>
            </>
          )}
          <input
            id="logo-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setLogo(e.target.files?.[0] || null)}
          />
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Favicon</h3>
          <div
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-primary-500 transition-colors"
            onClick={() => document.getElementById('favicon-input')?.click()}
          >
            {favicon ? (
              <div className="flex items-center justify-center gap-3">
                <CheckIcon size={20} className="text-green-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{favicon.name}</span>
              </div>
            ) : (
              <>
                <UploadIcon size={32} className="text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ICO or PNG (32x32 recommended)
                </p>
              </>
            )}
            <input
              id="favicon-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFavicon(e.target.files?.[0] || null)}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSave} isLoading={isSaving}>Save Logos</Button>
        </div>
      </Card>
    </div>
  );
}