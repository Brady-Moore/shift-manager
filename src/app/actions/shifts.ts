"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";

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

export async function deleteShift(formData: FormData) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "MANAGER") {
    return;
  }

  const shiftId = formData.get("shiftId");

  if (typeof shiftId !== "string" || shiftId.length === 0) {
    return;
  }

  const shift = await prisma.shift.findUnique({
    where: {
      id: shiftId,
    },
  });

  if (!shift) {
    return;
  }

  await prisma.$transaction([
    prisma.shiftRequest.deleteMany({
      where: {
        shiftId,
      },
    }),

    prisma.shift.delete({
      where: {
        id: shiftId,
      },
    }),
  ]);

  revalidatePath("/dashboard");
}
