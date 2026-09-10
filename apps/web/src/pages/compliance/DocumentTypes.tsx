import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Spinner } from '../../components/ui/Spinner';
import { PlusIcon } from '../../components/ui/icons';
import apiClient from '../../api/client';
import toast from 'react-hot-toast';

export function DocumentTypes() {
  const [types, setTypes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');

  const loadTypes = () => {
    apiClient.get('/compliance/kyc/document-types').then((res: any) => setTypes(res.data || [])).catch(() => {}).finally(() => setIsLoading(false));
  };

  useEffect(() => { loadTypes(); }, []);

  const handleAdd = async () => {
    if (!name.trim()) return;
    try {
      await apiClient.post('/compliance/kyc/document-types', { name });
      setName('');
      toast.success('Document type added');
      loadTypes();
    } catch {
      toast.error('Failed to add');
    }
  };

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Document Types</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Configure accepted KYC documents</p>
      </div>

      <Card>
        <div className="flex gap-2 mb-4">
          <Input placeholder="New document type name" value={name} onChange={(e) => setName(e.target.value)} />
          <Button onClick={handleAdd}>
            <PlusIcon size={18} /> Add
          </Button>
        </div>

        <div className="space-y-2">
          {types.map((t) => (
            <div key={t.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <span className="text-sm font-medium text-gray-900 dark:text-white">{t.name}</span>
              <Badge variant={t.isActive ? 'success' : 'neutral'}>{t.isActive ? 'Active' : 'Inactive'}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}