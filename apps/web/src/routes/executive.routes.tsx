import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { ExecutiveLayout } from '../layouts/ExecutiveLayout';
import { useAuthStore } from '../stores/auth.store';

function RequireExecutive({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.roles?.includes('ADMIN') && !user?.roles?.includes('SUPER_ADMIN')) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}

export const executiveRoutes = (
  <Route
    element={
      <RequireExecutive>
        <ExecutiveLayout />
      </RequireExecutive>
    }
  >
    <Route path="/executive" element={<div>Executive Dashboard</div>} />
    <Route path="/executive/subscription-revenue" element={<div>Subscription Revenue</div>} />
    <Route path="/executive/marketplace-revenue" element={<div>Marketplace Revenue</div>} />
    <Route path="/executive/provider-revenue" element={<div>Provider Revenue</div>} />
    <Route path="/executive/affiliate-revenue" element={<div>Affiliate Revenue</div>} />
    <Route path="/executive/ib-revenue" element={<div>IB Revenue</div>} />
    <Route path="/executive/referral-cost" element={<div>Referral Cost</div>} />
    <Route path="/executive/net-revenue" element={<div>Net Platform Revenue</div>} />
    <Route path="/executive/user-growth" element={<div>User Growth</div>} />
    <Route path="/executive/provider-growth" element={<div>Provider Growth</div>} />
    <Route path="/executive/trader-growth" element={<div>Trader Growth</div>} />
    <Route path="/executive/trading-volume" element={<div>Trading Volume</div>} />
    <Route path="/executive/platform-performance" element={<div>Platform Performance</div>} />
    <Route path="/executive/retention" element={<div>Retention & Conversion</div>} />
    <Route path="/executive/financial-reports" element={<div>Financial Reports</div>} />
  </Route>
);