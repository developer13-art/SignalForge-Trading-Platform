import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { AiIcon, CheckIcon } from '../../components/ui/icons';
import apiClient from '../../api/client';
import toast from 'react-hot-toast';

export function ProviderDNATest() {
  const [providerId, setProviderId] = useState('');
  const [testMessage, setTestMessage] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTest = async () => {
    if (!testMessage.trim()) {
      toast.error('Enter a test message');
      return;
    }
    setIsLoading(true);
    try {
      const response: any = await apiClient.post('/ai/provider-dna/test', {
        providerId,
        testMessage,
      });
      setResult(response.data);
      toast.success('Test completed');
    } catch (error: any) {
      toast.error(error?.response?.data?.error?.message || 'Test failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Provider DNA Test</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Test the DNA engine with a sample message
        </p>
      </div>

      <Card>
        <div className="space-y-4">
          <Textarea
            label="Test Message"
            placeholder="Paste a message from a provider"
            value={testMessage}
            onChange={(e) => setTestMessage(e.target.value)}
            rows={5}
          />
          <div className="flex justify-end">
            <Button onClick={handleTest} isLoading={isLoading}>
              <AiIcon size={18} />
              Test DNA
            </Button>
          </div>
        </div>
      </Card>

      {result && (
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <CheckIcon size={20} className="text-green-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Test Result</h3>
          </div>
          <pre className="p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto text-xs">
            {JSON.stringify(result, null, 2)}
          </pre>
        </Card>
      )}
    </div>
  );
}