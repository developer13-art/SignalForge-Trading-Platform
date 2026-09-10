import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { ProviderLayout } from '../layouts/ProviderLayout';
import { useAuthStore } from '../stores/auth.store';

function RequireProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user?.roles?.includes('PROVIDER') && !user?.roles?.includes('ADMIN')) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}

export const providerRoutes = (
  <Route
    element={
      <RequireProvider>
        <ProviderLayout />
      </RequireProvider>
    }
  >
    <Route path="/provider" element={<div>Provider Dashboard</div>} />
    <Route path="/provider/profile" element={<div>Profile</div>} />
    <Route path="/provider/subscribers" element={<div>Subscribers</div>} />
    <Route path="/provider/revenue" element={<div>Revenue</div>} />
    <Route path="/provider/analytics" element={<div>Analytics</div>} />
    <Route path="/provider/signals" element={<div>Signals</div>} />
    <Route path="/provider/dna" element={<div>Provider DNA</div>} />
    <Route path="/provider/certification" element={<div>Certification</div>} />
    <Route path="/provider/plans" element={<div>Subscription Plans</div>} />
    <Route path="/provider/withdrawals" element={<div>Withdrawals</div>} />
    <Route path="/provider/affiliates" element={<div>Affiliates</div>} />
    <Route path="/provider/marketing" element={<div>Marketing</div>} />
    <Route path="/provider/reviews" element={<div>Reviews</div>} />
    <Route path="/provider/settings" element={<div>Settings</div>} />
  </Route>
);