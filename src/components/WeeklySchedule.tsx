"use client";
import { useState } from "react";
import { EditShift } from "./EditShift";
import type {
  CurrentUser,
  Employees,
  WeeklyShifts,
} from "@/app/dashboard/page";
import { deleteShift } from "@/app/actions/shifts";

type WeeklyScheduleProps = {
  shifts: WeeklyShifts;
  currentUser: CurrentUser;
  employees: Employees;
};

export function WeeklySchedule({
  shifts,
  currentUser,
  employees,
}: WeeklyScheduleProps) {
  const [editingShiftId, setEditingShiftId] = useState<string | null>(null);
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
            {currentUser.role === "MANAGER" && (
              <>
                <form
                  action={deleteShift}
                  className="mt-3 flex items-center gap-2"
                >
                  <input type="hidden" name="shiftId" value={shift.id} />
                  <button
                    type="button"
                    onClick={() =>
                      setEditingShiftId(
                        editingShiftId === shift.id ? null : shift.id,
                      )
                    }
                    className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  >
                    Edit
                  </button>
                  <button
                    type="submit"
                    className="rounded-md border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                  >
                    Delete Shift
                  </button>
                </form>
                {editingShiftId === shift.id && (
                  <EditShift
                    shift={shift}
                    employees={employees}
                    onCancel={() => setEditingShiftId(null)}
                  />
                )}
              </>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
