import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { MailIcon, CheckIcon, AlertIcon } from '../../components/ui/icons';
import { authService } from '../../services/auth.service';
import toast from 'react-hot-toast';

export function EmailVerification() {
  const [params] = useSearchParams();
  const email = params.get('email') || '';
  const [isResending, setIsResending] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleResend = async () => {
    setIsResending(true);
    try {
      // Call API to resend verification
      toast.success('Verification email sent');
    } catch (error) {
      toast.error('Failed to resend');
    } finally {
      setIsResending(false);
    }
  };

  if (verified) {
    return (
      <div className="card p-8 text-center">
        <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckIcon size={28} className="text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Email Verified</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Your email has been verified successfully.
        </p>
        <Link to="/login" className="inline-block mt-6">
          <Button>Continue to Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="card p-8">
      <div className="text-center mb-6">
        <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <MailIcon size={28} className="text-primary-600 dark:text-primary-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Verify Your Email</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          We sent a verification link to
        </p>
        <p className="font-medium text-gray-900 dark:text-white mt-1">{email}</p>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Click the link in the email to verify your account. Did not receive it?
        </p>
        <Button onClick={handleResend} isLoading={isResending} variant="outline" className="w-full">
          Resend Verification Email
        </Button>
        <Link to="/login" className="block text-center text-sm text-primary-600 dark:text-primary-400 hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
}