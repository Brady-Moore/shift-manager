"use client";

import { useState } from "react";
import type {
  CurrentUser,
  WeeklyShifts,
  ShiftRequests,
  Employees,
} from "@/app/dashboard/page";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardNav } from "./DashboardNav";
import { WeeklySchedule } from "./WeeklySchedule";
import { CreateShift } from "./CreateShift";
import { MyShifts } from "./MyShifts";
import { PendingRequests } from "./PendingRequests";
import { OpenRequests } from "./OpenRequests";
import { History } from "./History";

type DashboardProps = {
  currentUser: CurrentUser;
  shifts: WeeklyShifts;
  shiftRequests: ShiftRequests;
  employees: Employees;
};

export function Dashboard({
  currentUser,
  shifts,
  shiftRequests,
  employees,
}: DashboardProps) {
  const defaultTab =
    currentUser.role === "MANAGER" ? "Pending Requests" : "My Shifts";

  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <main className="min-h-screen bg-slate-100 p-4 text-slate-900">
      <div className="mx-auto max-w-5xl space-y-6">
        <DashboardHeader currentUser={currentUser} />
        <DashboardNav
          currentUser={currentUser}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        {activeTab === "Pending Requests" && (
          <PendingRequests shiftRequests={shiftRequests} />
        )}
        {activeTab === "Weekly Schedule" && (
          <WeeklySchedule
            currentUser={currentUser}
            shifts={shifts}
            employees={employees}
          />
        )}
        {activeTab === "Open Requests" && (
          <OpenRequests
            currentUser={currentUser}
            shiftRequests={shiftRequests}
            shifts={shifts}
          />
        )}
        {activeTab === "Create Shift" && <CreateShift employees={employees} />}
        {activeTab === "My Shifts" && (
          <MyShifts
            currentUser={currentUser}
            shifts={shifts}
            shiftRequests={shiftRequests}
          />
        )}
        {activeTab === "History" && (
          <History currentUser={currentUser} shiftRequests={shiftRequests} />
        )}
      </div>
    </main>
  );
}
