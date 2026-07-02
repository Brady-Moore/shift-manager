import type { ShiftRequests } from "@/app/dashboard/page";
import {
  approveShiftRequest,
  denyShiftRequest,
} from "@/app/actions/shiftRequests";

type PendingRequestsProps = {
  shiftRequests: ShiftRequests;
};

export function PendingRequests({ shiftRequests }: PendingRequestsProps) {
  const pendingRequests = shiftRequests.filter(
    (request) => request.status === "PENDING" && request.claimerId !== null,
  );

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold">Pending Requests</h2>

      <div className="mt-4 space-y-3">
        {pendingRequests.length === 0 ? (
          <p className="text-sm text-slate-600">
            No requests are ready for review.
          </p>
        ) : (
          pendingRequests.map((request) => (
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

              {request.claimer ? (
                <p className="mt-2 text-sm font-medium text-slate-700">
                  Claimed by {request.claimer.name}
                </p>
              ) : (
                <p className="mt-2 text-sm text-amber-700">
                  Waiting for another employee to claim this shift
                </p>
              )}

              <form action={approveShiftRequest} className="mt-3">
                <input type="hidden" name="shiftRequestId" value={request.id} />

                <button
                  type="submit"
                  className="rounded-md bg-teal-600 px-3 py-2 text-sm font-medium text-white hover:bg-teal-800"
                >
                  Approve
                </button>
              </form>

              <form action={denyShiftRequest} className="mt-4 space-y-2">
                <input type="hidden" name="shiftRequestId" value={request.id} />

                <textarea
                  name="managerNote"
                  placeholder="Reason for denial (optional)"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                />

                <button
                  type="submit"
                  className="rounded-md bg-red-700 px-3 py-2 text-sm font-medium text-white hover:bg-red-800"
                >
                  Deny
                </button>
              </form>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
