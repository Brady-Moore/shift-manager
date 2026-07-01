import type { ShiftRequests } from "@/app/dashboard/page";

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
                <p className="mt-2 text-sm font-medium text-green-700">
                  Ready for review • Claimed by {request.claimer.name}
                </p>
              ) : (
                <p className="mt-2 text-sm text-amber-700">
                  Waiting for another employee to claim this shift
                </p>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
}
