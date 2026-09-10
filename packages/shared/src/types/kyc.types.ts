export interface KycApplication {
  id: string;
  userId: string;
  status: string;
  provider?: string;
  providerReference?: string;
  submittedAt?: string;
  reviewedAt?: string;
  verifiedAt?: string;
  expiresAt?: string;
  rejectionReason?: string;
  reviewNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface KycDocument {
  id: string;
  applicationId: string;
  documentTypeId: string;
  documentNumber?: string;
  storageKey: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
  verifiedAt?: string;
}

export interface KycDocumentType {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
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

export interface KycStatusResponse {
  status: string;
  applicationId?: string;
  submittedAt?: string;
  verifiedAt?: string;
  rejectionReason?: string;
  documentTypes: KycDocumentType[];
  documents: KycDocument[];
}

export interface KycReviewRequest {
  status: 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
  reviewNotes?: string;
}

export interface KycVerification {
  id: string;
  applicationId: string;
  documentCheck: boolean;
  identityCheck: boolean;
  livenessCheck: boolean;
  nameMatch: boolean;
  dobMatch: boolean;
  riskScore?: number;
  result?: string;
  verifiedAt?: string;
}