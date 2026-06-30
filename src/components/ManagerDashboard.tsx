import type { ManagerDashboardData } from "@/app/page";

type ManagerDashboardProps = {
  shifts: ManagerDashboardData;
};

export function ManagerDashboard({ shifts }: ManagerDashboardProps) {
  const pendingRequests = shifts.flatMap((shift) =>
    shift.requests
      .filter((request) => request.status === "PENDING")
      .map((request) => ({ ...request, shift })),
  );
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold">Shift Manager</h1>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Pending Requests</h2>

        <div className="mt-4 space-y-4">
          {pendingRequests.length === 0 ? (
            <p>No pending requests.</p>
          ) : (
            pendingRequests.map((request) => (
              <article key={request.id} className="rounded border p-4">
                <p className="font-semibold">
                  {request.requester.name} offered {request.shift.title}
                </p>

                <p>
                  {request.shift.startTime.toLocaleString()} –{" "}
                  {request.shift.endTime.toLocaleTimeString()}
                </p>

                <p>Claimed by: {request.claimer?.name ?? "No one yet"}</p>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Weekly Schedule</h2>

        <div className="mt-4 space-y-4">
          {shifts.map((shift) => (
            <article key={shift.id} className="rounded border p-4">
              <h3 className="font-semibold">{shift.title}</h3>

              <p>
                {shift.startTime.toLocaleString()} –{" "}
                {shift.endTime.toLocaleTimeString()}
              </p>

              <p>Assigned to: {shift.assignedUser?.name ?? "Open"}</p>

              {shift.requests.length > 0 && (
                <div className="mt-3 rounded bg-yellow-100 p-3 text-black">
                  <p>{shift.requests[0].requester.name} offered this shift.</p>

                  {shift.requests[0].claimer && (
                    <p>Claimed by {shift.requests[0].claimer.name}</p>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
