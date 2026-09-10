import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { TicketIcon, PlusIcon, ArrowRightIcon } from '../../components/ui/icons';

export function Tickets() {
  const tickets: any[] = [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tickets</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">All your support tickets</p>
        </div>
        <Link to="/support/tickets/new">
          <Button>
            <PlusIcon size={18} /> New Ticket
          </Button>
        </Link>
      </div>

      {tickets.length > 0 ? (
        <div className="space-y-3">
          {tickets.map((t: any) => (
            <Card key={t.id} hoverable>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{t.subject}</h3>
                    <Badge variant={t.status === 'OPEN' ? 'info' : t.status === 'RESOLVED' ? 'success' : 'warning'}>
                      {t.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{t.description}</p>
                </div>
                <Link to={`/support/tickets/${t.id}`}>
                  <Button variant="ghost" size="sm">
                    <ArrowRightIcon size={16} />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <EmptyState
            icon={<TicketIcon size={32} className="text-gray-400" />}
            title="No Tickets"
            description="You have no support tickets."
            action={{ label: 'Create Ticket', onClick: () => window.location.href = '/support/tickets/new' }}
          />
        </Card>
      )}
    </div>
  );
}