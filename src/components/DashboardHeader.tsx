import type { CurrentUser } from "@/app/dashboard/page";
import { SignOutButton } from "./SignOutButton";

type DashboardHeaderProps = {
  currentUser: CurrentUser;
};

export function DashboardHeader({ currentUser }: DashboardHeaderProps) {
  return (
    <header className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Shift Manager</h1>

          <p className="mt-1 text-sm text-slate-600">
            Signed in as {currentUser.name} ({currentUser.role})
          </p>
        </div>

        <SignOutButton />
      </div>
    </header>
  );
}
