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
          <img
            src="/shiftswap-logo.png"
            alt="ShiftSwap"
            className="h-12 w-auto"
          />

          <p className="mt-1 ml-2 text-sm text-slate-600">
            Signed in as {currentUser.name} ({currentUser.role})
          </p>
        </div>

        <SignOutButton />
      </div>
    </header>
  );
}
