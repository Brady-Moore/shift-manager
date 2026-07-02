import { claimShift } from "@/app/actions/shiftRequests";
import type {
  CurrentUser,
  ShiftRequests,
  WeeklyShifts,
} from "@/app/dashboard/page";
import { claimOpenShift } from "@/app/actions/shiftRequests";

type OpenRequestsProps = {
  currentUser: CurrentUser;
  shifts: WeeklyShifts;
  shiftRequests: ShiftRequests;
};

export function OpenRequests({
  currentUser,
  shiftRequests,
  shifts,
}: OpenRequestsProps) {
  const openRequests = shiftRequests.filter(
    (request) =>
      request.status === "PENDING" &&
      request.claimerId === null &&
      request.requesterId !== currentUser.id,
  );

  const openShifts = shifts.filter((shift) => shift.assignedUserId === null);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mt-4 space-y-3">
        {openShifts.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mt-3">Open Shifts</h3>

            <div className="mt-2 space-y-3">
              {openShifts.map((shift) => (
                <article
                  key={shift.id}
                  className="rounded border border-slate-200 p-3"
                >
                  <h4 className="font-medium">{shift.title}</h4>

                  <p className="text-sm text-slate-600">
                    {shift.startTime.toLocaleString()} –{" "}
                    {shift.endTime.toLocaleTimeString()}
                  </p>

                  <form action={claimOpenShift} className="mt-3">
                    <input type="hidden" name="shiftId" value={shift.id} />

                    <button
                      type="submit"
                      className="rounded-md border border-teal-500 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                    >
                      Claim Open Shift
                    </button>
                  </form>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
      <h2 className="text-lg font-semibold mt-3">Open Requests</h2>

      <div className="mt-4 space-y-3">
        {openRequests.length === 0 ? (
          <p className="text-sm text-slate-600">
            There are no open shift requests right now.
          </p>
        ) : (
          openRequests.map((request) => (
            <article
              key={request.id}
              className="rounded border border-slate-200 p-3"
            >
              <h3 className="font-medium">{request.shift.title}</h3>

              <p className="text-sm text-slate-600">
                Offered by: {request.requester.name}
              </p>

              <p className="text-sm text-slate-600">
                {request.shift.startTime.toLocaleString()} –{" "}
                {request.shift.endTime.toLocaleTimeString()}
              </p>

              <form action={claimShift} className="mt-3">
                <input type="hidden" name="shiftRequestId" value={request.id} />

                <button
                  type="submit"
                  className="rounded-md border border-teal-500 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  Claim Shift
                </button>
              </form>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
