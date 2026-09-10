import { prisma } from '../../config/database';

export class SignalValidationService {
  async validateSignal(signalId: string): Promise<{ passed: boolean; checks: any[] }> {
    const signal = await prisma.signal.findUnique({ where: { id: signalId } });
    if (!signal) return { passed: false, checks: [] };

    const checks = [
      { name: 'Symbol Present', passed: Boolean(signal.symbol) },
      { name: 'Direction Present', passed: Boolean(signal.direction) },
      { name: 'Confidence Above Threshold', passed: (signal.confidence || 0) >= 0.8 },
      { name: 'Not Expired', passed: !signal.expiresAt || signal.expiresAt > new Date() },
    ];

    const passed = checks.every(c => c.passed);

    for (const check of checks) {
      await prisma.signalValidation.create({
        data: {
          signalId,
          checkName: check.name,
          passed: check.passed,
          severity: check.passed ? 'LOW' : 'HIGH',
          message: check.passed ? 'Passed' : 'Failed',
        },
      });
    }

    if (passed) {
      await prisma.signal.update({
        where: { id: signalId },
        data: { status: 'VALIDATED' },
      });
    }

    return { passed, checks };
  }
}

export const signalValidationService = new SignalValidationService();