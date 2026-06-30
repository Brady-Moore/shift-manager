import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { ManagerDashboard } from "@/components/ManagerDashboard";

const adapter = new PrismaPg({
  connectionString: process.env["DATABASE_URL"],
});

const prisma = new PrismaClient({ adapter });

async function getManagerDashboardData() {
  return prisma.shift.findMany({
    include: {
      assignedUser: true,
      requests: {
        include: {
          requester: true,
          claimer: true,
        },
      },
    },
    orderBy: {
      startTime: "asc",
    },
  });
}

export type ManagerDashboardData = Awaited<
  ReturnType<typeof getManagerDashboardData>
>;

export default async function Home() {
  const shifts = await getManagerDashboardData();

  return <ManagerDashboard shifts={shifts} />;
}
