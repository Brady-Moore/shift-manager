"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
