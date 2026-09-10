import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { ArrowLeftIcon, ArrowRightIcon } from '../../components/ui/icons';
import { brokerService } from '../../services/broker.service';
import toast from 'react-hot-toast';

const schema = z.object({
  brokerId: z.string().min(1, 'Select a broker'),
  platform: z.enum(['MT4', 'MT5']),
  server: z.string().min(1, 'Server is required'),
  loginNumber: z.string().min(1, 'Login number is required'),
  password: z.string().min(1, 'Password is required'),
  accountType: z.enum(['DEMO', 'LIVE']),
  nickname: z.string().min(2, 'Nickname is required'),
});

type FormData = z.infer<typeof schema>;

export function ConnectBroker() {
  const navigate = useNavigate();
  const [brokers, setBrokers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { platform: 'MT5', accountType: 'DEMO' },
  });

  useEffect(() => {
    brokerService.getBrokers().then(setBrokers);
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await brokerService.connect(data);
      toast.success('Broker connected successfully');
      navigate('/brokers');
    } catch (error: any) {
      toast.error(error?.response?.data?.error?.message || 'Failed to connect');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/brokers')} className="text-gray-400 hover:text-gray-600">
          <ArrowLeftIcon size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Connect Broker</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Add your MT4/MT5 account via MetaApi
          </p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Select
            label="Broker"
            options={brokers.map((b) => ({ value: b.id, label: b.name }))}
            placeholder="Select your broker"
            error={errors.brokerId?.message}
            {...register('brokerId')}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Platform"
              options={[
                { value: 'MT4', label: 'MetaTrader 4' },
                { value: 'MT5', label: 'MetaTrader 5' },
              ]}
              error={errors.platform?.message}
              {...register('platform')}
            />
            <Select
              label="Account Type"
              options={[
                { value: 'DEMO', label: 'Demo' },
                { value: 'LIVE', label: 'Live' },
              ]}
              error={errors.accountType?.message}
              {...register('accountType')}
            />
          </div>

          <Input label="Server" placeholder="e.g., Exness-MT5Real" error={errors.server?.message} {...register('server')} />
          <Input label="Login Number" placeholder="Your account login" error={errors.loginNumber?.message} {...register('loginNumber')} />
          <Input label="Password" type="password" error={errors.password?.message} {...register('password')} />
          <Input label="Account Nickname" placeholder="e.g., Exness Live" error={errors.nickname?.message} {...register('nickname')} />

          <div className="flex justify-end pt-2">
            <Button type="submit" isLoading={isLoading}>
              Connect Broker <ArrowRightIcon size={18} />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}