import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { KycIcon, CheckIcon, ArrowRightIcon, ClockIcon, ShieldIcon } from '../../components/ui/icons';

const steps = [
  { icon: CheckIcon, title: 'Personal Information', description: 'Provide your name, DOB, and contact details.' },
  { icon: KycIcon, title: 'Identity Document', description: 'Upload a government-issued ID.' },
  { icon: ShieldIcon, title: 'Selfie Verification', description: 'Confirm your identity with a liveness check.' },
  { icon: ClockIcon, title: 'Review', description: 'We review and verify within 1-3 business days.' },
];

export function KYCIntroduction() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <KycIcon size={40} className="text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Identity Verification</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            To comply with regulations and unlock all features, we need to verify your identity.
            This usually takes a few minutes.
          </p>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">What to Expect</h2>
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Step {index + 1}: {step.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">You Will Need</h2>
        <ul className="space-y-2">
          {[
            'A valid government-issued ID (National ID, Passport, Driver\'s Licence, or Voter\'s Card)',
            'A device with a camera for the selfie check',
            'Your current residential address',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CheckIcon size={16} className="text-green-500 mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </Card>

      <div className="flex justify-end">
        <Button onClick={() => navigate('/kyc/personal-info')}>
          Begin Verification <ArrowRightIcon size={18} />
        </Button>
      </div>
    </div>
  );
}