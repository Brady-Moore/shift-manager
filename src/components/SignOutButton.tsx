import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function signOut() {
  "use server";

  const cookieStore = await cookies();

  cookieStore.delete("demoUserId");

  redirect("/");
}

export function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
      >
        Sign Out
      </button>
    </form>
  );
}
