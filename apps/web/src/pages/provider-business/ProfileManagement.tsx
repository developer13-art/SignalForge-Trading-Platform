import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import toast from 'react-hot-toast';

export function ProfileManagement() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    website: '',
    logoUrl: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(r => setTimeout(r, 500));
      toast.success('Profile updated');
    } catch {
      toast.error('Failed to update');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Management</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your public provider profile
        </p>
      </div>

      <Card>
        <div className="space-y-4">
          <Input
            label="Provider Name"
            placeholder="e.g., Trader X Signals"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Textarea
            label="Description"
            placeholder="Tell subscribers about your strategy..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
          />
          <Input
            label="Website"
            placeholder="https://..."
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
          />
          <Input
            label="Logo URL"
            placeholder="https://..."
            value={form.logoUrl}
            onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
          />
          <div className="flex justify-end">
            <Button onClick={handleSave} isLoading={isSaving}>Save Profile</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}