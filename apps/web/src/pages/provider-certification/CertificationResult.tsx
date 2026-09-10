import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CheckIcon, AlertIcon } from '../../components/ui/icons';

export function CertificationResult() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Certification Result</h1>
      </div>

      <Card>
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertIcon size={40} className="text-yellow-600" />
          </div>
          <Badge variant="warning" size="lg">Pending Certification</Badge>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
            Import your historical messages to begin the certification process.
          </p>
        </div>
      </Card>
    </div>
  );
}