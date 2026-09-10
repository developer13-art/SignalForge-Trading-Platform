import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import { CheckIcon, ArrowRightIcon, AlertIcon } from '../../components/ui/icons';

const steps = [
  'File format and size',
  'Image quality',
  'Document type detection',
  'Required fields detection',
  'Duplicate check',
];

export function DocumentVerification() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setComplete(true);
          return prev;
        }
        return prev + 1;
      });
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <div className="text-center py-8">
          {complete ? (
            <>
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckIcon size={32} className="text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Document Verified</h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Your document passed automated quality checks.
              </p>
            </>
          ) : (
            <>
              <Spinner size="lg" />
              <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">Verifying Document</h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Running quality checks...
              </p>
            </>
          )}
        </div>

        <div className="space-y-3 mt-6">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                index <= currentStep ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
              }`}>
                {index <= currentStep && <CheckIcon size={14} />}
              </div>
              <span className={`text-sm ${
                index <= currentStep ? 'text-gray-900 dark:text-white' : 'text-gray-400'
              }`}>
                {step}
              </span>
            </div>
          ))}
        </div>

        {complete && (
          <div className="mt-6 flex justify-end">
            <Button onClick={() => navigate('/kyc/selfie')}>
              Continue <ArrowRightIcon size={18} />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}