import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { UploadIcon, CheckIcon, ArrowLeftIcon, ArrowRightIcon } from '../../components/ui/icons';
import { kycService } from '../../services/kyc.service';
import toast from 'react-hot-toast';

export function IdentityDocument() {
  const navigate = useNavigate();
  const [documentTypes, setDocumentTypes] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    kycService.getDocumentTypes().then((types: any) => {
      setDocumentTypes(types.map((t: any) => ({ value: t.id, label: t.name })));
    });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!allowed.includes(f.type)) {
        toast.error('Only JPG, PNG, or PDF allowed');
        return;
      }
      if (f.size > 10 * 1024 * 1024) {
        toast.error('File must be under 10MB');
        return;
      }
      setFile(f);
    }
  };

  const handleUpload = async () => {
    if (!selectedType || !file) {
      toast.error('Please select type and upload a file');
      return;
    }
    setIsLoading(true);
    try {
      const status: any = await kycService.getStatus();
      const appId = status.applicationId;
      setApplicationId(appId);
      await kycService.uploadDocument(appId, selectedType, documentNumber, file);
      toast.success('Document uploaded');
      navigate('/kyc/document-verification');
    } catch (error: any) {
      toast.error(error?.response?.data?.error?.message || 'Upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/kyc/personal-info')} className="text-gray-400 hover:text-gray-600">
          <ArrowLeftIcon size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Identity Document</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Step 2 of 4</p>
        </div>
      </div>

      <Card>
        <div className="space-y-4">
          <Select
            label="Document Type"
            options={documentTypes}
            placeholder="Select document type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Document Number (Optional)
            </label>
            <input
              type="text"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              className="input-field"
              placeholder="Enter document number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upload Document
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-primary-500 transition-colors"
            >
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <CheckIcon size={20} className="text-green-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{file.name}</span>
                </div>
              ) : (
                <>
                  <UploadIcon size={32} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Click to upload JPG, PNG, or PDF (max 10MB)
                  </p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={handleUpload} isLoading={isLoading} disabled={!file || !selectedType}>
              Continue <ArrowRightIcon size={18} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}