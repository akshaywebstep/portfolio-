// src/app/controllers/educationController.ts
// Education Controller (Shipowl-style)

import { NextRequest, NextResponse } from "next/server";
import {
  getAllEducationModel,
  createEducationModel,
  updateEducationModel,
  deleteEducationModel,
} from "@/app/models/education";
import { requireAdminAuth } from "@/utils/auth/authMiddleware";
import { logMessage } from "@/utils/commonUtils";
import { syncResumePdf } from "@/utils/resume/resumePdfGenerator";

export async function handleGetEducation() {
  try {
    const education = await getAllEducationModel();
    return NextResponse.json({ success: true, data: education }, { status: 200 });
  } catch (error: any) {
    logMessage("error", "Error fetching education:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch education" },
      { status: 500 }
    );
  }
}

export async function handleCreateEducation(req: NextRequest) {
  const auth = requireAdminAuth(req);
  if (!auth.authenticated) {
    return auth.errorResponse!;
  }

  try {
    const body = await req.json();
    const created = await createEducationModel({
      degree: body.degree,
      institution: body.institution,
      year: body.year,
      score: body.score,
      order: body.order,
    });
    syncResumePdf().catch((e) => logMessage("error", "Failed to sync resume PDF:", e));
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: any) {
    logMessage("error", "Error creating education:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create education" },
      { status: 500 }
    );
  }
}

export async function handleUpdateEducation(req: NextRequest) {
  const auth = requireAdminAuth(req);
  if (!auth.authenticated) {
    return auth.errorResponse!;
  }

  try {
    const body = await req.json();
    const id = Number(body.id);
    if (!id || isNaN(id)) {
      return NextResponse.json({ success: false, error: "Valid Education ID is required" }, { status: 400 });
    }

    const { id: _ignored, ...data } = body;
    const updated = await updateEducationModel(id, data);
    syncResumePdf().catch((e) => logMessage("error", "Failed to sync resume PDF:", e));
    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error: any) {
    logMessage("error", "Error updating education:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update education" },
      { status: 500 }
    );
  }
}

export async function handleDeleteEducation(req: NextRequest) {
  const auth = requireAdminAuth(req);
  if (!auth.authenticated) {
    return auth.errorResponse!;
  }

  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");
    const id = Number(idParam);
    if (!idParam || isNaN(id)) {
      return NextResponse.json({ success: false, error: "Valid Education ID is required" }, { status: 400 });
    }

    await deleteEducationModel(id);
    syncResumePdf().catch((e) => logMessage("error", "Failed to sync resume PDF:", e));
    return NextResponse.json({ success: true, message: "Education deleted successfully" }, { status: 200 });
  } catch (error: any) {
    logMessage("error", "Error deleting education:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete education" },
      { status: 500 }
    );
  }
}
