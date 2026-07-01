import type { Employees } from "@/app/dashboard/page";
import { createShift } from "@/app/actions/shifts";

type CreateShiftProps = {
  employees: Employees;
};

export function CreateShift({ employees }: CreateShiftProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold">Create Shift</h2>
      <p className="mt-1 text-sm text-slate-600">
        Add a new shift to the weekly schedule.
      </p>

      <form action={createShift} className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Title</span>
          <input
            name="title"
            type="text"
            placeholder="Morning Register"
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Start time</span>
          <input
            name="startTime"
            type="datetime-local"
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">End time</span>
          <input
            name="endTime"
            type="datetime-local"
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            Assigned employee
          </span>
          <select
            name="assignedUserId"
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900"
            defaultValue=""
          >
            <option value="">Open shift</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="w-full rounded-md bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-800"
        >
          Create Shift
        </button>
      </form>
    </section>
  );
}
