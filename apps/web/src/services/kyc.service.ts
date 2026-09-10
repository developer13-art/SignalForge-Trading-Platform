import { apiClient } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';

export interface KycStatus {
  status: string;
  applicationId?: string;
  submittedAt?: string;
  verifiedAt?: string;
  rejectionReason?: string;
  documentTypes: Array<{
    id: string;
    name: string;
    description?: string;
    isActive: boolean;
  }>;
}

export interface KycPersonalInfo {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  countryOfResidence: string;
  address: string;
  phoneNumber: string;
}

export const kycService = {
  async getStatus(): Promise<KycStatus> {
    const response = await apiClient.get<{ success: boolean; data: KycStatus }>(
      ENDPOINTS.KYC.STATUS
    );
    return response.data;
  },

  async startApplication(): Promise<{ id: string }> {
    const response = await apiClient.post<{ success: boolean; data: { id: string } }>(
      ENDPOINTS.KYC.START
    );
    return response.data;
  },

  async submitPersonalInfo(data: KycPersonalInfo): Promise<{ applicationId: string }> {
    const response = await apiClient.post<{ success: boolean; data: { applicationId: string } }>(
      ENDPOINTS.KYC.SUBMIT_PERSONAL_INFO,
      data
    );
    return response.data;
  },

  async uploadDocument(applicationId: string, documentTypeId: string, documentNumber: string | undefined, file: File): Promise<void> {
    const formData = new FormData();
    formData.append('applicationId', applicationId);
    formData.append('documentTypeId', documentTypeId);
    if (documentNumber) {
      formData.append('documentNumber', documentNumber);
    }
    formData.append('document', file);

    await apiClient.post(ENDPOINTS.KYC.UPLOAD_DOCUMENT, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  async submitForReview(applicationId: string): Promise<{ status: string }> {
    const response = await apiClient.post<{ success: boolean; data: { status: string } }>(
      ENDPOINTS.KYC.SUBMIT_VERIFICATION,
      { applicationId }
    );
    return response.data;
  },

  async resubmit(): Promise<{ id: string }> {
    const response = await apiClient.post<{ success: boolean; data: { id: string } }>(
      ENDPOINTS.KYC.RESUBMIT
    );
    return response.data;
  },
};