import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Spinner } from '../../components/ui/Spinner';
import { SearchIcon, ArrowRightIcon } from '../../components/ui/icons';
import apiClient from '../../api/client';

export function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/admin/users').then((res: any) => {
      setUsers(res.data?.data || []);
      setFiltered(res.data?.data || []);
    }).catch(() => {}).finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!search.trim()) { setFiltered(users); return; }
    const q = search.toLowerCase();
    setFiltered(users.filter(u => u.email?.toLowerCase().includes(q) || u.firstName?.toLowerCase().includes(q)));
  }, [search, users]);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage platform users</p>
      </div>

      <Card>
        <Input placeholder="Search users..." leftIcon={<SearchIcon size={18} />} value={search} onChange={(e) => setSearch(e.target.value)} />
      </Card>

      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">KYC</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map((u) => (
                <tr key={u.id}>
                  <td className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                    {u.firstName} {u.lastName}
                  </td>
                  <td className="px-6 py-3 text-gray-600 dark:text-gray-400">{u.email}</td>
                  <td className="px-6 py-3">
                    <Badge variant={u.kycStatus === 'VERIFIED' ? 'success' : 'warning'}>{u.kycStatus}</Badge>
                  </td>
                  <td className="px-6 py-3">
                    <Badge variant={u.status === 'ACTIVE' ? 'success' : 'danger'}>{u.status}</Badge>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <Link to={`/admin/users/${u.id}`} className="text-primary-600 inline-flex items-center gap-1">
                      View <ArrowRightIcon size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}