import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const data = [
    { name: 'Andi', nim: '123456', major: 'Informatika' },
    { name: 'Budi', nim: '123457', major: 'Sistem Informasi' },
    { name: 'Citra', nim: '123458', major: 'Teknik Komputer' },
  ];

  for (const s of data) {
    await prisma.student.upsert({
      where: { nim: s.nim },
      update: {},
      create: s,
    });
  }
  console.log('Seed selesai');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
