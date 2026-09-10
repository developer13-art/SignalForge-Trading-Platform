import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { ArrowLeftIcon, PlusIcon } from '../../components/ui/icons';
import { riskService } from '../../services/risk.service';
import toast from 'react-hot-toast';

const conditionTypes = [
  { value: 'PROFIT', label: 'Profit' },
  { value: 'LOSS', label: 'Loss' },
  { value: 'CONFIDENCE', label: 'Signal Confidence' },
  { value: 'SYMBOL', label: 'Symbol' },
  { value: 'PRICE', label: 'Price' },
];

const operators = [
  { value: 'GT', label: 'Greater than' },
  { value: 'LT', label: 'Less than' },
  { value: 'GTE', label: 'Greater than or equal' },
  { value: 'LTE', label: 'Less than or equal' },
  { value: 'EQ', label: 'Equals' },
];

const actionTypes = [
  { value: 'MOVE_SL_TO_BREAK_EVEN', label: 'Move SL to Break Even' },
  { value: 'TRAILING_STOP', label: 'Enable Trailing Stop' },
  { value: 'PARTIAL_CLOSE', label: 'Partial Close' },
  { value: 'CLOSE_TRADE', label: 'Close Trade' },
  { value: 'SKIP_EXECUTION', label: 'Skip Execution' },
];

export function CreateIfThenRule() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    conditionType: 'PROFIT',
    operator: 'GT',
    value: '10',
    action: 'MOVE_SL_TO_BREAK_EVEN',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) {
      toast.error('Enter a rule name');
      return;
    }
    setIsLoading(true);
    try {
      const numericValue = isNaN(Number(form.value)) ? form.value : Number(form.value);
      await riskService.createRule({
        name: form.name,
        condition: {
          type: form.conditionType,
          operator: form.operator,
          value: numericValue,
        },
        action: {
          type: form.action,
        },
        enabled: true,
      });
      toast.success('Rule created');
      navigate('/risk/automation');
    } catch (error: any) {
      toast.error(error?.response?.data?.error?.message || 'Failed to create');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/risk/automation')} className="text-gray-400 hover:text-gray-600">
          <ArrowLeftIcon size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create IF/THEN Rule</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Build a rule that runs after risk approval
          </p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Rule Name"
            placeholder="e.g., Break even at $10 profit"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">IF</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Select
                options={conditionTypes}
                value={form.conditionType}
                onChange={(e) => setForm({ ...form, conditionType: e.target.value })}
              />
              <Select
                options={operators}
                value={form.operator}
                onChange={(e) => setForm({ ...form, operator: e.target.value })}
              />
              <Input
                placeholder="Value"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
              />
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">THEN</p>
            <Select
              options={actionTypes}
              value={form.action}
              onChange={(e) => setForm({ ...form, action: e.target.value })}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" isLoading={isLoading}>
              <PlusIcon size={18} />
              Create Rule
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}