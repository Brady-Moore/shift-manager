"use server";

import { revalidatePath } from "next/cache";
import { ShiftRequestType } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function claimShift(formData: FormData) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "EMPLOYEE") {
    return;
  }

  const shiftRequestId = formData.get("shiftRequestId");

  if (typeof shiftRequestId !== "string" || shiftRequestId.length === 0) {
    return;
  }

  const request = await prisma.shiftRequest.findUnique({
    where: {
      id: shiftRequestId,
    },
  });

  if (!request) {
    return;
  }

  if (request.status !== "PENDING") {
    return;
  }

  if (request.requesterId === currentUser.id) {
    return;
  }

  if (request.claimerId !== null) {
    return;
  }

  await prisma.shiftRequest.update({
    where: {
      id: shiftRequestId,
    },
    data: {
      claimerId: currentUser.id,
    },
  });

  revalidatePath("/dashboard");
}

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
