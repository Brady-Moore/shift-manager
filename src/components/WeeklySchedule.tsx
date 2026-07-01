import type { WeeklyShifts } from "@/app/dashboard/page";

type WeeklyScheduleProps = {
  shifts: WeeklyShifts;
};

export function WeeklySchedule({ shifts }: WeeklyScheduleProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold">Weekly Schedule</h2>

      <div className="mt-4 space-y-3">
        {shifts.map((shift) => (
          <article
            key={shift.id}
            className="rounded border border-slate-200 p-3"
          >
            <h3 className="font-medium">{shift.title}</h3>
            <p className="text-sm text-slate-600">
              {shift.startTime.toLocaleString()} –{" "}
              {shift.endTime.toLocaleTimeString()}
            </p>
            <p className="text-sm">
              Assigned to: {shift.assignedUser?.name ?? "Open"}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
