import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { MailIcon, CheckIcon } from '../../components/ui/icons';
import { authService } from '../../services/auth.service';
import toast from 'react-hot-toast';

const schema = z.object({
  email: z.string().email('Valid email required'),
});

type FormData = z.infer<typeof schema>;

export function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword(data.email);
      setSent(true);
      toast.success('Reset email sent');
    } catch {
      toast.error('Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="card p-8 text-center">
        <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckIcon size={28} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Check Your Email</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          We sent a password reset link to your email.
        </p>
        <Link to="/login" className="inline-block mt-6">
          <Button variant="outline">Back to Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="card p-8">
      <div className="text-center mb-6">
        <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <MailIcon size={28} className="text-primary-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Forgot Password</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Enter your email to receive a reset link
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          leftIcon={<MailIcon size={18} />}
          error={errors.email?.message}
          {...register('email')}
        />
        <Button type="submit" isLoading={isLoading} className="w-full">Send Reset Link</Button>
      </form>

      <div className="mt-6 text-center">
        <Link to="/login" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
}