import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { ComplianceLayout } from '../layouts/ComplianceLayout';
import { useAuthStore } from '../stores/auth.store';

function RequireCompliance({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  const allowed = ['COMPLIANCE_OFFICER', 'ADMIN', 'SUPER_ADMIN'];
  if (!user?.roles?.some(r => allowed.includes(r))) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

export const complianceRoutes = (
  <Route
    element={
      <RequireCompliance>
        <ComplianceLayout />
      </RequireCompliance>
    }
  >
    <Route path="/compliance" element={<div>Compliance Dashboard</div>} />
    <Route path="/compliance/kyc-queue" element={<div>KYC Queue</div>} />
    <Route path="/compliance/pending" element={<div>Pending KYC</div>} />
    <Route path="/compliance/under-review" element={<div>Under Review</div>} />
    <Route path="/compliance/verified" element={<div>Verified</div>} />
    <Route path="/compliance/rejected" element={<div>Rejected</div>} />
    <Route path="/compliance/suspended" element={<div>Suspended</div>} />
    <Route path="/compliance/document-types" element={<div>Document Types</div>} />
    <Route path="/compliance/providers" element={<div>Verification Providers</div>} />
    <Route path="/compliance/risk-flags" element={<div>Risk Flags</div>} />
    <Route path="/compliance/reports" element={<div>Reports</div>} />
    <Route path="/compliance/audit-trail" element={<div>KYC Audit Trail</div>} />
  </Route>
);