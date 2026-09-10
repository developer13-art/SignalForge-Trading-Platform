import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { SupportLayout } from '../layouts/SupportLayout';
import { useAuthStore } from '../stores/auth.store';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export const supportRoutes = (
  <Route
    element={
      <RequireAuth>
        <SupportLayout />
      </RequireAuth>
    }
  >
    <Route path="/support" element={<div>Help Center</div>} />
    <Route path="/support/dashboard" element={<div>Support Dashboard</div>} />
    <Route path="/support/tickets" element={<div>Tickets</div>} />
    <Route path="/support/tickets/new" element={<div>Create Ticket</div>} />
    <Route path="/support/tickets/:id" element={<div>Ticket Details</div>} />
    <Route path="/support/knowledge-base" element={<div>Knowledge Base</div>} />
    <Route path="/support/trading-faq" element={<div>Trading FAQ</div>} />
    <Route path="/support/kyc-faq" element={<div>KYC FAQ</div>} />
    <Route path="/support/billing-faq" element={<div>Billing FAQ</div>} />
    <Route path="/support/technical" element={<div>Technical Support</div>} />
  </Route>
);