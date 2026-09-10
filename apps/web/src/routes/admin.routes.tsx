import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout';
import { useAuthStore } from '../stores/auth.store';
import { AdminDashboard } from '../pages/admin';

function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.roles?.includes('ADMIN') && !user?.roles?.includes('SUPER_ADMIN')) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}

export const adminRoutes = (
  <Route
    element={
      <RequireAdmin>
        <AdminLayout />
      </RequireAdmin>
    }
  >
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/admin/users" element={<div>Users</div>} />
    <Route path="/admin/users/:id" element={<div>User Details</div>} />
    <Route path="/admin/kyc" element={<div>KYC Management</div>} />
    <Route path="/admin/providers" element={<div>Providers</div>} />
    <Route path="/admin/traders" element={<div>Traders</div>} />
    <Route path="/admin/signal-sources" element={<div>Signal Sources</div>} />
    <Route path="/admin/brokers" element={<div>Brokers</div>} />
    <Route path="/admin/live-monitor" element={<div>Live Monitor</div>} />
    <Route path="/admin/ai-monitoring" element={<div>AI Monitoring</div>} />
    <Route path="/admin/provider-dna-monitoring" element={<div>Provider DNA</div>} />
    <Route path="/admin/risk-monitoring" element={<div>Risk Monitoring</div>} />
    <Route path="/admin/referrals" element={<div>Referrals</div>} />
    <Route path="/admin/subscriptions" element={<div>Subscriptions</div>} />
    <Route path="/admin/payments" element={<div>Payments</div>} />
    <Route path="/admin/withdrawals" element={<div>Withdrawals</div>} />
    <Route path="/admin/affiliates" element={<div>Affiliates</div>} />
    <Route path="/admin/marketplace" element={<div>Marketplace Moderation</div>} />
    <Route path="/admin/reports" element={<div>Reports</div>} />
    <Route path="/admin/system-analytics" element={<div>System Analytics</div>} />
    <Route path="/admin/audit-logs" element={<div>Audit Logs</div>} />
    <Route path="/admin/security" element={<div>Security Center</div>} />
    <Route path="/admin/settings" element={<div>System Settings</div>} />
  </Route>
);