"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createShift(formData: FormData) {
  const title = formData.get("title");
  const shiftDate = formData.get("shiftDate");
  const startTime = formData.get("startTime");
  const endTime = formData.get("endTime");
  const assignedUserId = formData.get("assignedUserId");

  if (
    typeof title !== "string" ||
    typeof shiftDate !== "string" ||
    typeof startTime !== "string" ||
    typeof endTime !== "string"
  ) {
    return;
  }

  if (title.trim().length === 0) {
    return;
  }

  const start = new Date(`${shiftDate}T${startTime}`);
  const end = new Date(`${shiftDate}T${endTime}`);

  if (end <= start) {
    return;
  }

  await prisma.shift.create({
    data: {
      title,
      startTime: start,
      endTime: end,
      assignedUserId:
        typeof assignedUserId === "string" && assignedUserId.length > 0
          ? assignedUserId
          : null,
    },
  });

  revalidatePath("/dashboard");
}
