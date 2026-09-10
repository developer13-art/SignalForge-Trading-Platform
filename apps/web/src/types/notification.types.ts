export interface Notification {
  id: string;
  type: 'signal' | 'trade' | 'kyc' | 'referral' | 'payment' | 'security' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  channels?: string[];
  metadata?: Record<string, unknown>;
  createdAt: string;
}