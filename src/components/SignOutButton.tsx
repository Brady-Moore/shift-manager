import { signOut } from "@/app/actions/auth";

export function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="rounded-md border border-teal-500 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
      >
        Sign Out
      </button>
    </form>
  );
}
