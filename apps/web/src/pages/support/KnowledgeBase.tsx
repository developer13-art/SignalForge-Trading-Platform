import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { ChevronDownIcon, SearchIcon } from '../../components/ui/icons';

const articles = [
  { title: 'Getting Started with SignalForge', category: 'Basics' },
  { title: 'How to Connect Telegram', category: 'Signal Sources' },
  { title: 'Connecting MT4/MT5 Accounts', category: 'Brokers' },
  { title: 'Setting Up Risk Rules', category: 'Risk Management' },
  { title: 'Understanding Provider DNA', category: 'AI' },
  { title: 'Subscription Plans Explained', category: 'Billing' },
  { title: 'How Referrals Work', category: 'Referrals' },
  { title: 'Complete KYC Verification', category: 'KYC' },
];

export function KnowledgeBase() {
  const [search, setSearch] = useState('');
  const filtered = articles.filter(a => a.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Knowledge Base</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Browse our guides and tutorials</p>
      </div>

      <Card>
        <Input
          placeholder="Search articles..."
          leftIcon={<SearchIcon size={18} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Card>

      <div className="space-y-2">
        {filtered.map((a, i) => (
          <Card key={i} hoverable>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{a.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{a.category}</p>
              </div>
              <ChevronDownIcon size={16} className="text-gray-400" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}