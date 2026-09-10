import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { kycService } from '../../services/kyc.service';
import { ArrowLeftIcon, ArrowRightIcon } from '../../components/ui/icons';
import toast from 'react-hot-toast';

const schema = z.object({
  firstName: z.string().min(2, 'Required'),
  middleName: z.string().optional(),
  lastName: z.string().min(2, 'Required'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD'),
  nationality: z.string().min(2, 'Required'),
  countryOfResidence: z.string().min(2, 'Required'),
  address: z.string().min(5, 'Required'),
  phoneNumber: z.string().min(10, 'Valid phone required'),
});

type FormData = z.infer<typeof schema>;

const countries = [
  { value: 'NG', label: 'Nigeria' },
  { value: 'US', label: 'United States' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'CA', label: 'Canada' },
  { value: 'ZA', label: 'South Africa' },
  { value: 'KE', label: 'Kenya' },
  { value: 'GH', label: 'Ghana' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'IN', label: 'India' },
];

export function PersonalInformation() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await kycService.submitPersonalInfo(data);
      toast.success('Personal information saved');
      navigate('/kyc/identity-document');
    } catch (error: any) {
      toast.error(error?.response?.data?.error?.message || 'Failed to save');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/kyc')}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <ArrowLeftIcon size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Personal Information</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Step 1 of 4</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input label="First Name" error={errors.firstName?.message} {...register('firstName')} />
            <Input label="Middle Name" error={errors.middleName?.message} {...register('middleName')} />
            <Input label="Last Name" error={errors.lastName?.message} {...register('lastName')} />
          </div>

          <Input
            label="Date of Birth"
            type="date"
            error={errors.dateOfBirth?.message}
            {...register('dateOfBirth')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Nationality"
              options={countries}
              placeholder="Select nationality"
              error={errors.nationality?.message}
              {...register('nationality')}
            />
            <Select
              label="Country of Residence"
              options={countries}
              placeholder="Select country"
              error={errors.countryOfResidence?.message}
              {...register('countryOfResidence')}
            />
          </div>

          <Input label="Residential Address" error={errors.address?.message} {...register('address')} />
          <Input label="Phone Number" placeholder="+1234567890" error={errors.phoneNumber?.message} {...register('phoneNumber')} />

          <div className="flex justify-end pt-2">
            <Button type="submit" isLoading={isLoading}>
              Continue <ArrowRightIcon size={18} />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}