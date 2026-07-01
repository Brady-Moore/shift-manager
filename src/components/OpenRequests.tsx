import type { CurrentUser, ShiftRequests } from "@/app/dashboard/page";

type OpenRequestsProps = {
  currentUser: CurrentUser;
  shiftRequests: ShiftRequests;
};

export function OpenRequests({
  currentUser,
  shiftRequests,
}: OpenRequestsProps) {
  const openRequests = shiftRequests.filter(
    (request) =>
      request.status === "PENDING" &&
      request.claimerId === null &&
      request.requesterId !== currentUser.id,
  );

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold">Open Requests</h2>

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

              <button
                type="button"
                className="mt-3 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Claim Shift
              </button>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
