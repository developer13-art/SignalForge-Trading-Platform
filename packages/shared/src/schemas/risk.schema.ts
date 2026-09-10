import { z } from 'zod';

export const riskProfileSchema = z.object({
  riskPercent: z.number().min(0.1).max(100).optional(),
  maxDailyLoss: z.number().min(0.1).max(100).optional(),
  maxDrawdown: z.number().min(0.1).max(100).optional(),
  maxOpenTrades: z.number().int().min(1).max(100).optional(),
  tradingSessions: z.array(z.object({
    day: z.enum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']),
    enabled: z.boolean(),
    startTime: z.string(),
    endTime: z.string(),
  })).optional(),
  trailingStop: z.boolean().optional(),
  breakEven: z.boolean().optional(),
  profitLock: z.boolean().optional(),
  partialClose: z.boolean().optional(),
  correlationProtection: z.boolean().optional(),
  newsFilter: z.boolean().optional(),
  emergencyStop: z.boolean().optional(),
});

export const emergencyStopSchema = z.object({
  activate: z.boolean(),
  reason: z.string().optional(),
});

export type RiskProfileInput = z.infer<typeof riskProfileSchema>;
export type EmergencyStopInput = z.infer<typeof emergencyStopSchema>;