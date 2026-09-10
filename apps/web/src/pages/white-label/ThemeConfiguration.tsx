import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';

export function ThemeConfiguration() {
  const [colors, setColors] = useState({
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#22c55e',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(r => setTimeout(r, 500));
      toast.success('Theme saved');
    } finally {
      setIsSaving(false);
    }
  };

  const colorFields = [
    { key: 'primary', label: 'Primary Color' },
    { key: 'secondary', label: 'Secondary Color' },
    { key: 'accent', label: 'Accent Color' },
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Theme Configuration</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Choose your brand colors
        </p>
      </div>

      <Card>
        <div className="space-y-6">
          {colorFields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {field.label}
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={colors[field.key]}
                  onChange={(e) => setColors({ ...colors, [field.key]: e.target.value })}
                  className="w-16 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={colors[field.key]}
                  onChange={(e) => setColors({ ...colors, [field.key]: e.target.value })}
                  className="input-field font-mono text-sm"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSave} isLoading={isSaving}>Save Theme</Button>
        </div>
      </Card>
    </div>
  );
}