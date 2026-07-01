import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const adapter = new PrismaPg({
  connectionString: process.env["DATABASE_URL"],
});

const prisma = new PrismaClient({ adapter });

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
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-md">
        <h1 className="text-3xl font-bold">Shift Manager</h1>
        <p className="mt-2 text-gray-600">Select a demo user to continue.</p>

        <form action={signIn} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Continue as</span>
            <select
              name="userId"
              className="mt-2 w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-white"
              defaultValue=""
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
            className="w-full rounded bg-black px-4 py-2 font-medium text-white"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
