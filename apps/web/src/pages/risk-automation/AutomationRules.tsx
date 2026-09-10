import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Switch } from '../../components/ui/Switch';
import { Spinner } from '../../components/ui/Spinner';
import { EmptyState } from '../../components/common/EmptyState';
import { AiIcon, PlusIcon, TrashIcon } from '../../components/ui/icons';
import { riskService } from '../../services/risk.service';
import toast from 'react-hot-toast';

export function AutomationRules() {
  const [rules, setRules] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadRules = () => {
    riskService.getRules().then(setRules).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadRules();
  }, []);

  const handleToggle = async (ruleId: string, enabled: boolean) => {
    try {
      await riskService.updateRule(ruleId, { enabled });
      setRules(rules.map((r) => r.id === ruleId ? { ...r, enabled } : r));
      toast.success('Rule updated');
    } catch {
      toast.error('Failed to update');
    }
  };

  const handleDelete = async (ruleId: string) => {
    if (!confirm('Delete this rule?')) return;
    try {
      await riskService.deleteRule(ruleId);
      setRules(rules.filter((r) => r.id !== ruleId));
      toast.success('Rule deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Automation Rules</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            IF/THEN rules that run after risk approval
          </p>
        </div>
        <Link to="/risk/automation/create">
          <Button>
            <PlusIcon size={18} />
            Create Rule
          </Button>
        </Link>
      </div>

      {rules.length > 0 ? (
        <div className="space-y-3">
          {rules.map((rule) => (
            <Card key={rule.id}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{rule.name}</h3>
                    <Badge variant={rule.enabled ? 'success' : 'neutral'}>
                      {rule.enabled ? 'Active' : 'Disabled'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    IF {rule.condition?.type} {rule.condition?.operator} {String(rule.condition?.value)} → {rule.action?.type}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={rule.enabled}
                    onChange={(checked) => handleToggle(rule.id, checked)}
                  />
                  <button
                    onClick={() => handleDelete(rule.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <TrashIcon size={18} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <EmptyState
            icon={<AiIcon size={32} className="text-gray-400" />}
            title="No Automation Rules"
            description="Create your first IF/THEN rule to automate trade management."
            action={{ label: 'Create Rule', onClick: () => window.location.href = '/risk/automation/create' }}
          />
        </Card>
      )}
    </div>
  );
}