import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Textarea } from '../../components/ui/Textarea';
import { Badge } from '../../components/ui/Badge';
import { AiIcon, CheckIcon } from '../../components/ui/icons';
import apiClient from '../../api/client';
import toast from 'react-hot-toast';

export function AISignalParser() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleParse = async () => {
    if (!input.trim()) {
      toast.error('Please enter a message');
      return;
    }
    setIsLoading(true);
    try {
      const response: any = await apiClient.post('/ai/parse', { messageText: input });
      setResult(response.data);
      toast.success('Parsed successfully');
    } catch (error: any) {
      toast.error(error?.response?.data?.error?.message || 'Parse failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Signal Parser</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Test the AI parser with any message
        </p>
      </div>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Test Message</h3>
        <Textarea
          placeholder="Example: BUY EURUSD @ 1.1050 SL 1.1020 TP 1.1100"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
        />
        <div className="flex justify-end mt-4">
          <Button onClick={handleParse} isLoading={isLoading}>
            <AiIcon size={18} />
            Parse Signal
          </Button>
        </div>
      </Card>

      {result && (
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <CheckIcon size={20} className="text-green-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Parse Result</h3>
            <Badge variant="primary">{Math.round((result.confidence || 0) * 100)}%</Badge>
          </div>
          <pre className="p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto text-xs">
            {JSON.stringify(result, null, 2)}
          </pre>
        </Card>
      )}
    </div>
  );
}