import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { ArrowLeftIcon } from '../../components/ui/icons';
import { supportService } from '../../services/support.service';
import toast from 'react-hot-toast';

export function CreateTicket() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    subject: '',
    category: 'general',
    priority: 'normal',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subject.trim() || !form.description.trim()) {
      toast.error('Fill in all required fields');
      return;
    }
    setIsLoading(true);
    try {
      await supportService.createTicket(form);
      toast.success('Ticket created');
      navigate('/support/tickets');
    } catch (error: any) {
      toast.error(error?.response?.data?.error?.message || 'Failed to create ticket');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/support/tickets')} className="text-gray-400 hover:text-gray-600">
          <ArrowLeftIcon size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Ticket</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Subject"
            placeholder="Brief description of the issue"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Category"
              options={[
                { value: 'general', label: 'General' },
                { value: 'trading', label: 'Trading' },
                { value: 'kyc', label: 'KYC' },
                { value: 'billing', label: 'Billing' },
                { value: 'technical', label: 'Technical' },
              ]}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <Select
              label="Priority"
              options={[
                { value: 'low', label: 'Low' },
                { value: 'normal', label: 'Normal' },
                { value: 'high', label: 'High' },
                { value: 'urgent', label: 'Urgent' },
              ]}
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            />
          </div>

          <Textarea
            label="Description"
            placeholder="Describe the issue in detail..."
            rows={6}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <div className="flex justify-end">
            <Button type="submit" isLoading={isLoading}>Create Ticket</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}