"use client";

import { useState } from "react";
import type { CurrentUser, DashboardData } from "@/app/dashboard/page";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardNav } from "./DashboardNav";

type DashboardProps = {
  currentUser: CurrentUser;
  shifts: DashboardData["shifts"];
  shiftRequests: DashboardData["shiftRequests"];
};

export function Dashboard({ currentUser }: DashboardProps) {
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
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold">{activeTab} Placeholder</h2>
        </section>
      </div>
    </main>
  );
}
