import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Textarea } from '../../components/ui/Textarea';
import { Input } from '../../components/ui/Input';
import { supportService } from '../../services/support.service';
import toast from 'react-hot-toast';

export function TechnicalSupport() {
  const [form, setForm] = useState({ email: '', issue: '', logs: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.issue) {
      toast.error('Fill in all required fields');
      return;
    }
    setIsLoading(true);
    try {
      await supportService.contactTechnical(form);
      toast.success('Technical support request submitted');
      setForm({ email: '', issue: '', logs: '' });
    } catch {
      toast.error('Failed to submit');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Technical Support</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get help with technical issues</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Your Email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Textarea
            label="Describe the Issue"
            placeholder="Describe the technical problem you're experiencing..."
            rows={6}
            value={form.issue}
            onChange={(e) => setForm({ ...form, issue: e.target.value })}
          />
          <Textarea
            label="Error Logs (Optional)"
            placeholder="Paste any error messages or logs..."
            rows={4}
            value={form.logs}
            onChange={(e) => setForm({ ...form, logs: e.target.value })}
          />
          <div className="flex justify-end">
            <Button type="submit" isLoading={isLoading}>Submit Request</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}