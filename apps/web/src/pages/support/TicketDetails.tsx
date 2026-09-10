import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Textarea } from '../../components/ui/Textarea';
import { Spinner } from '../../components/ui/Spinner';
import { ArrowLeftIcon } from '../../components/ui/icons';
import { supportService } from '../../services/support.service';
import toast from 'react-hot-toast';

export function TicketDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<any>(null);
  const [reply, setReply] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    if (id) {
      supportService.getTicket(id).then(setTicket).catch(() => {}).finally(() => setIsLoading(false));
    }
  }, [id]);

  const handleReply = async () => {
    if (!reply.trim()) return;
    setIsReplying(true);
    try {
      await supportService.replyToTicket(id!, reply);
      toast.success('Reply sent');
      setReply('');
    } finally {
      setIsReplying(false);
    }
  };

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;
  if (!ticket) return <div>Ticket not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/support/tickets')} className="text-gray-400 hover:text-gray-600">
          <ArrowLeftIcon size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ticket Details</h1>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{ticket.subject}</h2>
          <Badge variant={ticket.status === 'OPEN' ? 'info' : ticket.status === 'RESOLVED' ? 'success' : 'warning'}>
            {ticket.status}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{ticket.description}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Created: {new Date(ticket.createdAt).toLocaleString()}
        </p>
      </Card>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Add Reply</h3>
        <Textarea
          placeholder="Type your reply..."
          rows={4}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
        <div className="flex justify-end mt-4">
          <Button onClick={handleReply} isLoading={isReplying}>Send Reply</Button>
        </div>
      </Card>
    </div>
  );
}