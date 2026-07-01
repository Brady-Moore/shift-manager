import type { CurrentUser, DashboardData } from "@/app/dashboard/page";
import { DashboardHeader } from "./DashboardHeader";
import { PendingRequests } from "./PendingRequests";
import { WeeklySchedule } from "./WeeklySchedule";

type DashboardProps = {
  currentUser: CurrentUser;
  shifts: DashboardData["shifts"];
  shiftRequests: DashboardData["shiftRequests"];
};

export function Dashboard({ currentUser }: DashboardProps) {
  return (
    <main className="min-h-screen bg-slate-100 p-4 text-slate-900">
      <div className="mx-auto max-w-5xl space-y-6">
        <DashboardHeader currentUser={currentUser} />

        {currentUser.role === "MANAGER" && <PendingRequests />}

        <WeeklySchedule />
      </div>
    </main>
  );
}
