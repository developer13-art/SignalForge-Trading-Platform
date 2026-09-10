import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanup() {
  console.log('Starting cleanup...');

  const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

  // Delete old completed jobs
  const deletedJobs = await prisma.job.deleteMany({
    where: {
      status: 'COMPLETED',
      completedAt: { lt: ninetyDaysAgo },
    },
  });
  console.log(`Deleted ${deletedJobs.count} jobs`);

  // Delete expired sessions
  const deletedSessions = await prisma.userSession.deleteMany({
    where: {
      expiresAt: { lt: new Date() },
    },
  });
  console.log(`Deleted ${deletedSessions.count} sessions`);

  console.log('Cleanup complete');
}

cleanup()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });