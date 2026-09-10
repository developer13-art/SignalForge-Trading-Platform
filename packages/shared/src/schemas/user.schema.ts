import { z } from 'zod';

export const updateProfileSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  username: z.string().min(3).max(30).optional(),
  phone: z.string().min(10).max(15).optional(),
  country: z.string().min(2).optional(),
  address: z.string().min(5).optional(),
  bio: z.string().max(500).optional(),
  tradingExperience: z.string().optional(),
  languages: z.array(z.string()).optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
});

export const updateStatusSchema = z.object({
  status: z.enum(['ACTIVE', 'SUSPENDED', 'LOCKED', 'BANNED', 'DEACTIVATED']),
  reason: z.string().optional(),
});

export const updateUserRoleSchema = z.object({
  roleIds: z.array(z.string().uuid()),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;
export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;