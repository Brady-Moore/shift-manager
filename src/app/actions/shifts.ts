"use server";

import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { revalidatePath } from "next/cache";

const adapter = new PrismaPg({
  connectionString: process.env["DATABASE_URL"],
});

const prisma = new PrismaClient({ adapter });

export async function createShift(formData: FormData) {
  const title = formData.get("title");
  const startTime = formData.get("startTime");
  const endTime = formData.get("endTime");
  const assignedUserId = formData.get("assignedUserId");

  if (
    typeof title !== "string" ||
    typeof startTime !== "string" ||
    typeof endTime !== "string"
  ) {
    return;
  }

  if (title.trim().length === 0) {
    return;
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (end <= start) {
    return;
  }

  await prisma.shift.create({
    data: {
      title,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      assignedUserId:
        typeof assignedUserId === "string" && assignedUserId.length > 0
          ? assignedUserId
          : null,
    },
  });

  revalidatePath("/dashboard");
}
