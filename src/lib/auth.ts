import { cookies } from "next/headers";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env["DATABASE_URL"],
});

const prisma = new PrismaClient({ adapter });

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("demoUserId")?.value;

  if (!userId) {
    return null;
  }

  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}
