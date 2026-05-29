import prisma from '../src/lib/prisma';

async function main() {
  console.log('Clearing old data...');
  // WARNING: In a real production DB, do NOT wipe data. This is just for initial seeding.
  await prisma.incident.deleteMany();
  await prisma.startup.deleteMany();
  await prisma.researchPaper.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding new data...');

  // 1. Create a Global Org
  const org = await prisma.organization.create({
    data: {
      name: 'Acme Global Technologies',
      slug: 'acme-global',
      type: 'CLIENT',
    },
  });

  // 2. Create Users
  const user1 = await prisma.user.create({
    data: {
      email: 'founder@acme.com',
      firstName: 'Alice',
      lastName: 'Founder',
      title: 'CEO',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'analyst@giin.com',
      firstName: 'Bob',
      lastName: 'Sec',
      title: 'Senior Analyst',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'researcher@giin.com',
      firstName: 'Dr. Carol',
      lastName: 'Science',
      title: 'Lead Researcher',
    },
  });

  // 3. Cyber Incidents
  await prisma.incident.create({
    data: {
      title: 'Unauthorized S3 Bucket Access',
      severity: 'HIGH',
      description: 'Multiple GBs of data transferred to unknown IP.',
      status: 'OPEN',
      organizationId: org.id,
      reporterId: user2.id,
    },
  });

  await prisma.incident.create({
    data: {
      title: 'Suspicious Login Attempt',
      severity: 'MEDIUM',
      description: 'Repeated failed logins from offshore IPs.',
      status: 'OPEN',
      organizationId: org.id,
      reporterId: user2.id,
    },
  });

  // 4. Startups
  const startup = await prisma.startup.create({
    data: {
      name: 'EcoEnergy AI',
      industry: 'ClimaTech',
      description: 'Using AI to optimize power grids in emerging markets.',
      stage: 'SEED',
      organizationId: org.id,
    },
  });

  // Founder Relation
  await prisma.startupFounder.create({
    data: {
      userId: user1.id,
      startupId: startup.id,
      role: 'CEO',
    },
  });

  // 5. Research Papers
  const paper = await prisma.researchPaper.create({
    data: {
      title: 'Quantum Resilience in Next-Gen Cryptography',
      abstract: 'An analysis of post-quantum encryption algorithms applicable to enterprise networks.',
      status: 'PUBLISHED',
      publishedAt: new Date(),
      organizationId: org.id,
    },
  });

  await prisma.paperAuthor.create({
    data: {
      userId: user3.id,
      paperId: paper.id,
      order: 1,
    },
  });

  // 6. Loan Settings
  await prisma.loanSettings.upsert({
    where: { key: 'INTEREST_RATES' },
    update: {},
    create: {
      key: 'INTEREST_RATES',
      value: {
        "1": 0.15,
        "2": 0.25,
        "default_increment": 0.05
      }
    }
  });

  console.log('Seeding complete! Ready for demo.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
