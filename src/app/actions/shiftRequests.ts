"use server";

import { revalidatePath } from "next/cache";
import { ShiftRequestType } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function requestCoverage(formData: FormData) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "EMPLOYEE") {
    return;
  }

  const shiftId = formData.get("shiftId");

  if (typeof shiftId !== "string" || shiftId.length === 0) {
    return;
  }

  const existingRequest = await prisma.shiftRequest.findFirst({
    where: {
      shiftId,
      status: "PENDING",
    },
  });

  if (existingRequest) {
    return;
  }

  await prisma.shiftRequest.create({
    data: {
      type: ShiftRequestType.GIVE_AWAY,
      shiftId,
      requesterId: currentUser.id,
    },
  });

  revalidatePath("/dashboard");
}
