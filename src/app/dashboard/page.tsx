import { redirect } from "next/navigation";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { getCurrentUser } from "@/lib/auth";
import { Dashboard } from "@/components/Dashboard";

const adapter = new PrismaPg({
  connectionString: process.env["DATABASE_URL"],
});

const prisma = new PrismaClient({ adapter });

async function getDashboardData() {
  const shifts = await prisma.shift.findMany({
    include: {
      assignedUser: true,
    },
    orderBy: {
      startTime: "asc",
    },
  });

  const shiftRequests = await prisma.shiftRequest.findMany({
    include: {
      shift: {
        include: {
          assignedUser: true,
        },
      },
      requester: true,
      claimer: true,
      reviewedBy: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    shifts,
    shiftRequests,
  };
}

export type DashboardData = Awaited<ReturnType<typeof getDashboardData>>;
export type CurrentUser = NonNullable<
  Awaited<ReturnType<typeof getCurrentUser>>
>;

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  const { shifts, shiftRequests } = await getDashboardData();

  return (
    <Dashboard
      currentUser={currentUser}
      shifts={shifts}
      shiftRequests={shiftRequests}
    />
  );
}
