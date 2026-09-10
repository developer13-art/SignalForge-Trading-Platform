import { z } from 'zod';

export const kycPersonalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(2, 'Last name is required'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of birth must be in YYYY-MM-DD format'),
  nationality: z.string().min(2, 'Nationality is required'),
  countryOfResidence: z.string().min(2, 'Country of residence is required'),
  address: z.string().min(5, 'Address is required'),
  phoneNumber: z.string().min(10, 'Valid phone number is required'),
});

export const kycDocumentUploadSchema = z.object({
  documentTypeId: z.string().uuid('Invalid document type'),
  documentNumber: z.string().optional(),
});

export const kycSubmitSchema = z.object({
  applicationId: z.string().uuid('Invalid application ID'),
});

export const kycReviewSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED']),
  rejectionReason: z.string().optional(),
  reviewNotes: z.string().optional(),
});

export const kycDocumentTypeSchema = z.object({
  name: z.string().min(2, 'Document type name is required'),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const kycDocumentTypeUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

export type KycPersonalInfoInput = z.infer<typeof kycPersonalInfoSchema>;
export type KycDocumentUploadInput = z.infer<typeof kycDocumentUploadSchema>;
export type KycSubmitInput = z.infer<typeof kycSubmitSchema>;
export type KycReviewInput = z.infer<typeof kycReviewSchema>;
export type KycDocumentTypeInput = z.infer<typeof kycDocumentTypeSchema>;
export type KycDocumentTypeUpdateInput = z.infer<typeof kycDocumentTypeUpdateSchema>;