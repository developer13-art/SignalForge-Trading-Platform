import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserLayout } from '../layouts/UserLayout';
import { useAuthStore } from '../stores/auth.store';
import { DashboardOverview } from '../pages/dashboard';
import { LiveSignals, SignalHistory, SignalDetails } from '../pages/signals';
import { SignalSources, TelegramConnection } from '../pages/signal-sources';
import { AnalyticsOverview } from '../pages/analytics';
import { ReferralDashboard } from '../pages/referrals';
import { BrokerAccounts } from '../pages/brokers';
import { PricingPlans, MySubscription } from '../pages/subscriptions';
import { KYCStatusDashboard } from '../pages/kyc';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export const userRoutes = (
  <Route
    element={
      <RequireAuth>
        <UserLayout />
      </RequireAuth>
    }
  >
    <Route path="/dashboard" element={<DashboardOverview />} />
    <Route path="/signals" element={<LiveSignals />} />
    <Route path="/signals/history" element={<SignalHistory />} />
    <Route path="/signals/:id" element={<SignalDetails />} />
    <Route path="/signal-sources" element={<SignalSources />} />
    <Route path="/signal-sources/telegram/connect" element={<TelegramConnection />} />
    <Route path="/analytics" element={<AnalyticsOverview />} />
    <Route path="/referrals" element={<ReferralDashboard />} />
    <Route path="/brokers" element={<BrokerAccounts />} />
    <Route path="/subscriptions/plans" element={<PricingPlans />} />
    <Route path="/subscriptions" element={<MySubscription />} />
    <Route path="/kyc" element={<KYCStatusDashboard />} />
    <Route path="/trading" element={<div>Trading</div>} />
    <Route path="/risk" element={<div>Risk</div>} />
    <Route path="/marketplace" element={<div>Marketplace</div>} />
    <Route path="/wallet" element={<div>Wallet</div>} />
    <Route path="/settings" element={<div>Settings</div>} />
  </Route>
);