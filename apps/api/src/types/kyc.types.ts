export interface KycPersonalInfoRequest {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  countryOfResidence: string;
  address: string;
  phoneNumber: string;
}

export interface KycDocumentUploadRequest {
  documentTypeId: string;
  documentNumber?: string;
}

export interface KycSubmitRequest {
  applicationId: string;
}

export interface KycReviewRequest {
  status: 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
  reviewNotes?: string;
}

export interface KycStatusResponse {
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

export interface KycVerificationResult {
  documentCheck: boolean;
  identityCheck: boolean;
  livenessCheck: boolean;
  nameMatch: boolean;
  dobMatch: boolean;
  riskScore?: number;
  result: 'PASS' | 'FAIL' | 'REVIEW';
}