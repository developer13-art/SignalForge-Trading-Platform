import React from 'react';
import { Route } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import {
  Login,
  Register,
  EmailVerification,
  PhoneVerification,
  ForgotPassword,
  ResetPassword,
  TwoFactorAuthentication,
  TwoFactorVerification,
  AccountRecovery,
  DeviceVerification,
} from '../pages/auth';

export const authRoutes = (
  <Route element={<AuthLayout />}>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/email-verification" element={<EmailVerification />} />
    <Route path="/phone-verification" element={<PhoneVerification />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/2fa" element={<TwoFactorAuthentication />} />
    <Route path="/2fa-verify" element={<TwoFactorVerification />} />
    <Route path="/account-recovery" element={<AccountRecovery />} />
    <Route path="/device-verification" element={<DeviceVerification />} />
  </Route>
);