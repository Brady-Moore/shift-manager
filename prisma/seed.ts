import { UserRole, ShiftRequestType } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

async function main() {
  await prisma.shiftRequest.deleteMany();
  await prisma.shift.deleteMany();
  await prisma.user.deleteMany();

  const manager = await prisma.user.create({
    data: {
      name: "Mina Tanaka",
      email: "mina.manager@example.com",
      role: UserRole.MANAGER,
    },
  });

  const employees = await prisma.user.createManyAndReturn({
    data: [
      {
        name: "Alex Carter",
        email: "alex@example.com",
        role: UserRole.EMPLOYEE,
      },
      {
        name: "Jamie Lee",
        email: "jamie@example.com",
        role: UserRole.EMPLOYEE,
      },
      {
        name: "Priya Shah",
        email: "priya@example.com",
        role: UserRole.EMPLOYEE,
      },
      { name: "Sam Rivera", email: "sam@example.com", role: UserRole.EMPLOYEE },
    ],
  });

  const [alex, jamie, priya, sam] = employees;

  const shifts = await prisma.shift.createManyAndReturn({
    data: [
      {
        title: "Morning Register",
        startTime: new Date("2026-07-06T09:00:00+09:00"),
        endTime: new Date("2026-07-06T13:00:00+09:00"),
        assignedUserId: alex.id,
      },
      {
        title: "Afternoon Floor",
        startTime: new Date("2026-07-06T13:00:00+09:00"),
        endTime: new Date("2026-07-06T17:00:00+09:00"),
        assignedUserId: jamie.id,
      },
      {
        title: "Evening Close",
        startTime: new Date("2026-07-06T17:00:00+09:00"),
        endTime: new Date("2026-07-06T21:00:00+09:00"),
        assignedUserId: priya.id,
      },
      {
        title: "Morning Stock",
        startTime: new Date("2026-07-07T09:00:00+09:00"),
        endTime: new Date("2026-07-07T13:00:00+09:00"),
        assignedUserId: sam.id,
      },
    ],
  });

  await prisma.shiftRequest.create({
    data: {
      type: ShiftRequestType.GIVE_AWAY,
      shiftId: shifts[0].id,
      requesterId: alex.id,
      claimerId: sam.id,
    },
  });

  console.log("Database seeded successfully.");
  console.log({ manager, employees, shifts });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
