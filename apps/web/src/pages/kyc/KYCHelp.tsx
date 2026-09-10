import React from 'react';
import { Card } from '../../components/ui/Card';
import { ChevronRightIcon } from '../../components/ui/icons';

const topics = [
  { title: 'What documents are accepted?', description: 'National ID, Voter\'s Card, Driver\'s Licence, or International Passport.' },
  { title: 'How long does verification take?', description: 'Typically 1-3 business days, but can be faster with clear documents.' },
  { title: 'Why was my application rejected?', description: 'Common reasons include unclear photos, expired documents, or mismatched information.' },
  { title: 'Is my data secure?', description: 'Yes. All documents are encrypted at rest and stored in private object storage.' },
  { title: 'Can I update my information?', description: 'Yes, during resubmission you can correct any information.' },
  { title: 'What if I changed my address?', description: 'Update your profile first, then complete re-verification.' },
];

export function KYCHelp() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">KYC Help</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Common questions about identity verification
        </p>
      </div>

      <div className="space-y-3">
        {topics.map((topic) => (
          <Card key={topic.title} hoverable>
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-medium text-gray-900 dark:text-white">{topic.title}</span>
                <ChevronRightIcon size={18} className="text-gray-400 group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{topic.description}</p>
            </details>
          </Card>
        ))}
      </div>
    </div>
  );
}