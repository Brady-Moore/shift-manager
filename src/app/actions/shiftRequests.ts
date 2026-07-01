"use server";

import { revalidatePath } from "next/cache";
import { ShiftRequestType, ShiftRequestStatus } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function claimOpenShift(formData: FormData) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "EMPLOYEE") {
    return;
  }

  const shiftId = formData.get("shiftId");

  if (typeof shiftId !== "string" || shiftId.length === 0) {
    return;
  }

  const shift = await prisma.shift.findUnique({
    where: { id: shiftId },
  });

  if (!shift || shift.assignedUserId !== null) {
    return;
  }

  await prisma.shift.update({
    where: { id: shiftId },
    data: {
      assignedUserId: currentUser.id,
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

export async function approveShiftRequest(formData: FormData) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "MANAGER") {
    return;
  }

  const shiftRequestId = formData.get("shiftRequestId");
  const managerNote = formData.get("managerNote");

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

  if (request.status !== "PENDING" || !request.claimerId) {
    return;
  }

  await prisma.$transaction([
    prisma.shiftRequest.update({
      where: {
        id: shiftRequestId,
      },
      data: {
        status: ShiftRequestStatus.APPROVED,
        reviewedById: currentUser.id,
        reviewedAt: new Date(),
        managerNote:
          typeof managerNote === "string" && managerNote.trim().length > 0
            ? managerNote.trim()
            : null,
      },
    }),

    prisma.shift.update({
      where: {
        id: request.shiftId,
      },
      data: {
        assignedUserId: request.claimerId,
      },
    }),
  ]);

  revalidatePath("/dashboard");
}

export async function denyShiftRequest(formData: FormData) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "MANAGER") {
    return;
  }

  const shiftRequestId = formData.get("shiftRequestId");
  const managerNote = formData.get("managerNote");

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

  if (request.status !== "PENDING" || !request.claimerId) {
    return;
  }

  await prisma.shiftRequest.update({
    where: {
      id: shiftRequestId,
    },
    data: {
      status: ShiftRequestStatus.REJECTED,
      reviewedById: currentUser.id,
      reviewedAt: new Date(),
      managerNote:
        typeof managerNote === "string" && managerNote.trim().length > 0
          ? managerNote.trim()
          : null,
    },
  });

  revalidatePath("/dashboard");
}
