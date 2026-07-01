import type { CurrentUser, ShiftRequests } from "@/app/dashboard/page";

type HistoryProps = {
  currentUser: CurrentUser;
  shiftRequests: ShiftRequests;
};

export function History({ currentUser, shiftRequests }: HistoryProps) {
  const history =
    currentUser.role === "MANAGER"
      ? shiftRequests.filter((request) => request.status !== "PENDING")
      : shiftRequests.filter(
          (request) =>
            request.status !== "PENDING" &&
            (request.requesterId === currentUser.id ||
              request.claimerId === currentUser.id),
        );

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold">History</h2>

      <div className="mt-4 space-y-3">
        {history.length === 0 ? (
          <p className="text-sm text-slate-600">No reviewed requests yet.</p>
        ) : (
          history.map((request) => (
            <article
              key={request.id}
              className="rounded border border-slate-200 p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-medium">{request.shift.title}</h3>

                  <p className="text-sm text-slate-600">
                    Requested by: {request.requester.name}
                  </p>

                  <p className="text-sm text-slate-600">
                    Claimed by: {request.claimer?.name ?? "No one"}
                  </p>
                </div>

                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    request.status === "APPROVED"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {request.status}
                </span>
              </div>

              {request.reviewedBy && request.reviewedAt && (
                <p className="mt-3 text-sm text-slate-600">
                  Reviewed by {request.reviewedBy.name} on{" "}
                  {request.reviewedAt.toLocaleString()}
                </p>
              )}

              {request.managerNote && (
                <div className="mt-3 rounded bg-slate-100 p-3 text-sm text-slate-700">
                  <p className="font-medium">Manager note</p>
                  <p className="mt-1">{request.managerNote}</p>
                </div>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
}
