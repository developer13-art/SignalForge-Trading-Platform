import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import { ArrowLeftIcon } from '../../components/ui/icons';
import apiClient from '../../api/client';

export function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      apiClient.get(`/admin/users/${id}`).then((res: any) => setUser(res.data)).catch(() => {}).finally(() => setIsLoading(false));
    }
  }, [id]);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/admin/users')} className="text-gray-400 hover:text-gray-600">
          <ArrowLeftIcon size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Details</h1>
      </div>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Account Information</h3>
        <div className="space-y-3">
          <Row label="Name" value={`${user.firstName} ${user.lastName}`} />
          <Row label="Email" value={user.email} />
          <Row label="KYC Status" value={<Badge variant={user.kycStatus === 'VERIFIED' ? 'success' : 'warning'}>{user.kycStatus}</Badge>} />
          <Row label="Status" value={<Badge variant={user.status === 'ACTIVE' ? 'success' : 'danger'}>{user.status}</Badge>} />
          <Row label="Joined" value={new Date(user.createdAt).toLocaleDateString()} />
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Actions</h3>
        <div className="flex gap-3">
          <Button variant="outline">Suspend</Button>
          <Button variant="danger">Ban</Button>
        </div>
      </Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-sm font-medium text-gray-900 dark:text-white">{value}</span>
    </div>
  );
}