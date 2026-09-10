import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { Button } from '../../components/ui/Button';
import { TicketIcon, ClockIcon, CheckIcon, PlusIcon } from '../../components/ui/icons';

export function SupportDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Support Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your support tickets</p>
        </div>
        <Link to="/support/tickets/new">
          <Button>
            <PlusIcon size={18} /> New Ticket
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Open Tickets" value="0" icon={<TicketIcon size={20} className="text-blue-600" />} iconBg="bg-blue-100 dark:bg-blue-900/30" />
        <StatCard label="In Progress" value="0" icon={<ClockIcon size={20} className="text-yellow-600" />} iconBg="bg-yellow-100 dark:bg-yellow-900/30" />
        <StatCard label="Resolved" value="0" icon={<CheckIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Tickets</h3>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
          No tickets yet. Create one if you need help.
        </div>
      </Card>
    </div>
  );
}