"use client";

import type { CurrentUser } from "@/app/dashboard/page";

type DashboardNavProps = {
  currentUser: CurrentUser;
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export function DashboardNav({
  currentUser,
  activeTab,
  onTabChange,
}: DashboardNavProps) {
  const tabs =
    currentUser.role === "MANAGER"
      ? ["Pending Requests", "Weekly Schedule", "History"]
      : ["My Shifts", "Weekly Schedule", "Open Requests", "History"];

  return (
    <nav className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              activeTab === tab
                ? "bg-slate-900 text-white"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
}
