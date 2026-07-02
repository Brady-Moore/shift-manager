import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function signIn(formData: FormData) {
  "use server";

  const userId = formData.get("userId");

  if (typeof userId !== "string" || userId.length === 0) {
    return;
  }

  const cookieStore = await cookies();

  cookieStore.set("demoUserId", userId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  redirect("/dashboard");
}

export default async function Home() {
  const users = await prisma.user.findMany({
    orderBy: [{ role: "asc" }, { name: "asc" }],
  });

  return (
    <main className="min-h-screen bg-slate-100 p-4 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-md items-center">
        <section className="w-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <img
            src="/shiftswap-logo.png"
            alt="ShiftSwap"
            className="h-16 w-auto mx-auto"
          />
          <p className="mt-3 text-center text-sm text-slate-600">
            Select a demo user to continue.
          </p>

          <form action={signIn} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">
                Continue as
              </span>

              <select
                name="userId"
                className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select a user
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} — {user.role}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              className="w-full rounded-md bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-800"
            >
              Sign in
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
