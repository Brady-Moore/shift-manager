"use client";

import type { Employees, WeeklyShifts } from "@/app/dashboard/page";
import { updateShift } from "@/app/actions/shifts";

type EditShiftProps = {
  shift: WeeklyShifts[number];
  employees: Employees;
  onCancel: () => void;
};

function formatDateInput(date: Date) {
  return date.toISOString().split("T")[0];
}

function formatTimeInput(date: Date) {
  return date.toTimeString().slice(0, 5);
}

export function EditShift({ shift, employees, onCancel }: EditShiftProps) {
  return (
    <form
      action={async (formData) => {
        await updateShift(formData);
        onCancel();
      }}
      className="mt-4 space-y-4 rounded-md bg-slate-50 p-4"
    >
      <input type="hidden" name="shiftId" value={shift.id} />

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Title</span>
        <input
          name="title"
          type="text"
          defaultValue={shift.title}
          className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900"
          required
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Date</span>
        <input
          name="shiftDate"
          type="date"
          defaultValue={formatDateInput(shift.startTime)}
          className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900"
          required
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Start time</span>
          <input
            name="startTime"
            type="time"
            defaultValue={formatTimeInput(shift.startTime)}
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">End time</span>
          <input
            name="endTime"
            type="time"
            defaultValue={formatTimeInput(shift.endTime)}
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900"
            required
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">
          Assigned employee
        </span>
        <select
          name="assignedUserId"
          defaultValue={shift.assignedUserId ?? ""}
          className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900"
        >
          <option value="">Open shift</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
      </label>

      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Save Changes
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
