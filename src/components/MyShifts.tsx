import type { CurrentUser, WeeklyShifts } from "@/app/dashboard/page";

type MyShiftsProps = {
  currentUser: CurrentUser;
  shifts: WeeklyShifts;
};

export function MyShifts({ currentUser, shifts }: MyShiftsProps) {
  const myShifts = shifts.filter(
    (shift) => shift.assignedUserId === currentUser.id,
  );

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold">My Shifts</h2>

      <div className="mt-4 space-y-3">
        {myShifts.length === 0 ? (
          <p className="text-sm text-slate-600">
            You do not have any assigned shifts.
          </p>
        ) : (
          myShifts.map((shift) => (
            <article
              key={shift.id}
              className="rounded border border-slate-200 p-3"
            >
              <h3 className="font-medium">{shift.title}</h3>
              <p className="text-sm text-slate-600">
                {shift.startTime.toLocaleString()} –{" "}
                {shift.endTime.toLocaleTimeString()}
              </p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
