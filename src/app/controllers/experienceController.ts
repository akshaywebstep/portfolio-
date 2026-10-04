// src/app/controllers/experienceController.ts
// Experience Controller (Shipowl-style)

import { NextRequest, NextResponse } from "next/server";
import {
  getAllExperiencesModel,
  createExperienceModel,
  updateExperienceModel,
  deleteExperienceModel,
} from "@/app/models/experience";
import { requireAdminAuth } from "@/utils/auth/authMiddleware";
import { logMessage } from "@/utils/commonUtils";
import { syncResumePdf } from "@/utils/resume/resumePdfGenerator";

export async function handleGetExperiences() {
  try {
    const experiences = await getAllExperiencesModel();
    return NextResponse.json({ success: true, data: experiences }, { status: 200 });
  } catch (error: any) {
    logMessage("error", "Error fetching experience:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch experiences" },
      { status: 500 }
    );
  }
}

export async function handleCreateExperience(req: NextRequest) {
  const auth = requireAdminAuth(req);
  if (!auth.authenticated) {
    return auth.errorResponse!;
  }

  try {
    const body = await req.json();
    const created = await createExperienceModel({
      company: body.company,
      location: body.location || "India",
      role: body.role,
      period: body.period,
      type: body.type || "Full-Time",
      subsections: typeof body.subsections === "object" ? JSON.stringify(body.subsections) : body.subsections || "[]",
      order: body.order,
    });
    syncResumePdf().catch((e) => logMessage("error", "Failed to sync resume PDF:", e));
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: any) {
    logMessage("error", "Error creating experience:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create experience" },
      { status: 500 }
    );
  }
}

export async function handleUpdateExperience(req: NextRequest) {
  const auth = requireAdminAuth(req);
  if (!auth.authenticated) {
    return auth.errorResponse!;
  }

  try {
    const body = await req.json();
    const id = Number(body.id);
    if (!id || isNaN(id)) {
      return NextResponse.json({ success: false, error: "Valid Experience ID is required" }, { status: 400 });
    }

    const { id: _ignored, ...data } = body;
    const updatePayload: any = { ...data };
    if (typeof data.subsections === "object") {
      updatePayload.subsections = JSON.stringify(data.subsections);
    }

    const updated = await updateExperienceModel(id, updatePayload);
    syncResumePdf().catch((e) => logMessage("error", "Failed to sync resume PDF:", e));
    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error: any) {
    logMessage("error", "Error updating experience:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update experience" },
      { status: 500 }
    );
  }
}

export async function handleDeleteExperience(req: NextRequest) {
  const auth = requireAdminAuth(req);
  if (!auth.authenticated) {
    return auth.errorResponse!;
  }

  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");
    const id = Number(idParam);
    if (!idParam || isNaN(id)) {
      return NextResponse.json({ success: false, error: "Valid Experience ID is required" }, { status: 400 });
    }

    await deleteExperienceModel(id);
    syncResumePdf().catch((e) => logMessage("error", "Failed to sync resume PDF:", e));
    return NextResponse.json({ success: true, message: "Experience deleted successfully" }, { status: 200 });
  } catch (error: any) {
    logMessage("error", "Error deleting experience:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete experience" },
      { status: 500 }
    );
  }
}
