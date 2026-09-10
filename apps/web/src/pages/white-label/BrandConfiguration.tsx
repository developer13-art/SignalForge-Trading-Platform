import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import toast from 'react-hot-toast';

export function BrandConfiguration() {
  const [form, setForm] = useState({
    brandName: '',
    tagline: '',
    supportEmail: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(r => setTimeout(r, 500));
      toast.success('Brand configuration saved');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Brand Configuration</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Configure your brand identity
        </p>
      </div>

      <Card>
        <div className="space-y-4">
          <Input
            label="Brand Name"
            placeholder="Your Platform Name"
            value={form.brandName}
            onChange={(e) => setForm({ ...form, brandName: e.target.value })}
          />
          <Input
            label="Tagline"
            placeholder="Your platform's tagline"
            value={form.tagline}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
          />
          <Input
            label="Support Email"
            type="email"
            placeholder="support@yourbrand.com"
            value={form.supportEmail}
            onChange={(e) => setForm({ ...form, supportEmail: e.target.value })}
          />
          <div className="flex justify-end">
            <Button onClick={handleSave} isLoading={isSaving}>Save</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}