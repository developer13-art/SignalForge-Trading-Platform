export interface KycStatus {
  status: string;
  applicationId?: string;
  submittedAt?: string;
  verifiedAt?: string;
  rejectionReason?: string;
  documentTypes: KycDocumentType[];
}

export interface KycDocumentType {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
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