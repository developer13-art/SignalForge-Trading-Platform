import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { MailIcon, CopyIcon, CheckIcon } from '../../components/ui/icons';
import { referralService } from '../../services/referral.service';
import toast from 'react-hot-toast';

export function InviteFriends() {
  const [email, setEmail] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    referralService.getDashboard().then((data) => {
      setReferralLink(data.referralLink);
    });
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Enter an email');
      return;
    }
    setIsSending(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      toast.success('Invitation sent');
      setEmail('');
    } catch {
      toast.error('Failed to send');
    } finally {
      setIsSending(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success('Copied');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Invite Friends</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Invite friends and earn 0.1% of their eligible net profit
        </p>
      </div>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Send Invitation</h3>
        <form onSubmit={handleSend} className="space-y-4">
          <Input
            label="Friend's Email"
            type="email"
            placeholder="friend@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<MailIcon size={18} />}
          />
          <Button type="submit" isLoading={isSending}>Send Invitation</Button>
        </form>
      </Card>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Or Share Your Link</h3>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="flex-1 input-field font-mono text-sm"
          />
          <Button variant="outline" onClick={copyLink}>
            {copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
          </Button>
        </div>
      </Card>
    </div>
  );
}