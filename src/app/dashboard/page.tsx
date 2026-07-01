import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { Dashboard } from "@/components/Dashboard";

async function getWeeklyShifts() {
  return prisma.shift.findMany({
    include: { assignedUser: true },
    orderBy: { startTime: "asc" },
  });
}

async function getShiftRequests() {
  return prisma.shiftRequest.findMany({
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
}

async function getEmployees() {
  return prisma.user.findMany({
    where: {
      role: "EMPLOYEE",
    },
    orderBy: {
      name: "asc",
    },
  });
}

export type WeeklyShifts = Awaited<ReturnType<typeof getWeeklyShifts>>;
export type ShiftRequests = Awaited<ReturnType<typeof getShiftRequests>>;
export type Employees = Awaited<ReturnType<typeof getEmployees>>;

export type CurrentUser = NonNullable<
  Awaited<ReturnType<typeof getCurrentUser>>
>;

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  const [shifts, shiftRequests, employees] = await Promise.all([
    getWeeklyShifts(),
    getShiftRequests(),
    getEmployees(),
  ]);

  return (
    <Dashboard
      currentUser={currentUser}
      shifts={shifts}
      shiftRequests={shiftRequests}
      employees={employees}
    />
  );
}
