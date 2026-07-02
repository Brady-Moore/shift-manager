import type {
  CurrentUser,
  WeeklyShifts,
  ShiftRequests,
} from "@/app/dashboard/page";
import { requestCoverage } from "@/app/actions/shiftRequests";

type MyShiftsProps = {
  currentUser: CurrentUser;
  shifts: WeeklyShifts;
  shiftRequests: ShiftRequests;
};

export function MyShifts({
  currentUser,
  shifts,
  shiftRequests,
}: MyShiftsProps) {
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
          myShifts.map((shift) => {
            const pendingRequest = shiftRequests.find(
              (request) =>
                request.shiftId === shift.id &&
                request.requesterId === currentUser.id &&
                request.status === "PENDING",
            );

            return (
              <article
                key={shift.id}
                className="rounded border border-slate-200 p-3"
              >
                <h3 className="font-medium">{shift.title}</h3>

                <p className="text-sm text-slate-600">
                  {shift.startTime.toLocaleString()} –{" "}
                  {shift.endTime.toLocaleTimeString()}
                </p>

                {pendingRequest ? (
                  <div className="mt-3 rounded-md bg-amber-50 p-3 text-sm">
                    Coverage request sent.
                    {/* Cancel button*/}
                  </div>
                ) : (
                  <form action={requestCoverage} className="mt-3">
                    <input type="hidden" name="shiftId" value={shift.id} />

                    <button
                      type="submit"
                      className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                    >
                      Request Coverage
                    </button>
                  </form>
                )}
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
