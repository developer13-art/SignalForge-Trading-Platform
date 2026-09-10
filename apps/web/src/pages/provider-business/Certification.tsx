import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { CheckIcon, ArrowRightIcon } from '../../components/ui/icons';

const requirements = [
  'Minimum 100 verified historical signals',
  'Parsing accuracy above 95%',
  'Consistent performance metrics',
  'No fraud or manipulation detected',
  'Completed provider profile',
  'KYC verification',
];

export function Certification() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Certification</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get certified to build subscriber trust
          </p>
        </div>
        <Badge variant="warning">Not Certified</Badge>
      </div>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Certification Requirements</h3>
        <ul className="space-y-2">
          {requirements.map((req) => (
            <li key={req} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0 mt-0.5">
                <CheckIcon size={12} className="text-gray-400" />
              </div>
              {req}
            </li>
          ))}
        </ul>
      </Card>

      <Link to="/provider/certification">
        <Button>
          Start Certification <ArrowRightIcon size={18} />
        </Button>
      </Link>
    </div>
  );
}