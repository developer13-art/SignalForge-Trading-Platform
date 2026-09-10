import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  console.log('Starting seed...');

  // Roles
  const roles = [
    { name: 'USER', description: 'Standard user' },
    { name: 'PROVIDER', description: 'Signal provider' },
    { name: 'TRADER', description: 'Manual trader' },
    { name: 'MODERATOR', description: 'Content moderator' },
    { name: 'COMPLIANCE_OFFICER', description: 'Compliance officer' },
    { name: 'FINANCE_ADMIN', description: 'Finance admin' },
    { name: 'SUPPORT', description: 'Support agent' },
    { name: 'ADMIN', description: 'Administrator' },
    { name: 'SUPER_ADMIN', description: 'Super administrator' },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      create: role,
      update: {},
    });
  }

  // Document types
  const docTypes = [
    { name: 'NATIONAL_ID', description: 'National Identity Card' },
    { name: 'VOTERS_CARD', description: "Voter's Card" },
    { name: 'DRIVERS_LICENSE', description: "Driver's Licence" },
    { name: 'INTERNATIONAL_PASSPORT', description: 'International Passport' },
  ];

  for (const docType of docTypes) {
    await prisma.kycDocumentType.upsert({
      where: { name: docType.name },
      create: docType,
      update: {},
    });
  }

  // System settings
  const settings = [
    { key: 'referral.reward_rate', value: 0.001, description: 'Referral reward rate' },
    { key: 'referral.settlement', value: 'monthly', description: 'Referral settlement period' },
    { key: 'kyc.required_for_subscription', value: true, description: 'KYC required for subscription' },
    { key: 'kyc.required_for_trading', value: true, description: 'KYC required for trading' },
    { key: 'kyc.required_for_referral', value: true, description: 'KYC required for referral' },
  ];

  for (const setting of settings) {
    await prisma.systemSetting.upsert({
      where: { key: setting.key },
      create: setting,
      update: { value: setting.value },
    });
  }

  // Subscription plans
  const plans = [
    {
      name: 'Monthly',
      description: 'Monthly subscription',
      price: 19,
      period: 'MONTHLY',
      isActive: true,
    },
    {
      name: 'Yearly',
      description: 'Yearly subscription',
      price: 190,
      period: 'YEARLY',
      isActive: true,
    },
  ];

  for (const plan of plans) {
    const existing = await prisma.subscriptionPlan.findFirst({ where: { name: plan.name } });
    if (!existing) {
      await prisma.subscriptionPlan.create({ data: plan });
    }
  }

  console.log('Seed complete');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });