import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { KycIcon, CheckIcon, ArrowLeftIcon, ArrowRightIcon, AlertIcon } from '../../components/ui/icons';
import { kycService } from '../../services/kyc.service';
import toast from 'react-hot-toast';

export function SelfieVerification() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [streaming, setStreaming] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStreaming(true);
      }
    } catch {
      toast.error('Camera access denied');
    }
  };

  const captureSelfie = () => {
    setCaptured(true);
    setStreaming(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const status: any = await kycService.getStatus();
      await kycService.submitForReview(status.applicationId);
      toast.success('KYC submitted for review');
      navigate('/kyc/status');
    } catch (error: any) {
      toast.error(error?.response?.data?.error?.message || 'Submission failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/kyc/document-verification')} className="text-gray-400 hover:text-gray-600">
          <ArrowLeftIcon size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Selfie Verification</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Step 3 of 4</p>
        </div>
      </div>

      <Card>
        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4 overflow-hidden relative">
          {captured ? (
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-3">
                <CheckIcon size={40} className="text-green-600" />
              </div>
              <p className="text-white">Selfie captured</p>
            </div>
          ) : streaming ? (
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-3">
                <KycIcon size={40} className="text-gray-400" />
              </div>
              <p className="text-gray-400 text-sm">Camera not started</p>
            </div>
          )}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-start gap-3 mb-4">
          <AlertIcon size={18} className="text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
          <div className="text-sm text-blue-700 dark:text-blue-300">
            Ensure your face is clearly visible, well-lit, and matches the photo on your identity document.
          </div>
        </div>

        <div className="flex justify-end gap-3">
          {!streaming && !captured && (
            <Button onClick={startCamera}>Start Camera</Button>
          )}
          {streaming && (
            <Button onClick={captureSelfie}>Capture</Button>
          )}
          {captured && (
            <Button onClick={handleSubmit} isLoading={isLoading}>
              Submit for Review <ArrowRightIcon size={18} />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}