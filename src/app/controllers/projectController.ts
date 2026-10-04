// src/app/controllers/projectController.ts
// Project Controller (Shipowl-style)

import { NextRequest, NextResponse } from "next/server";
import {
  getAllProjectsModel,
  createProjectModel,
  updateProjectModel,
  deleteProjectModel,
} from "@/app/models/project";
import { requireAdminAuth } from "@/utils/auth/authMiddleware";
import { logMessage } from "@/utils/commonUtils";
import { syncResumePdf } from "@/utils/resume/resumePdfGenerator";

export async function handleGetProjects() {
  try {
    const projects = await getAllProjectsModel();
    return NextResponse.json({ success: true, data: projects }, { status: 200 });
  } catch (error: any) {
    logMessage("error", "Error fetching projects:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function handleCreateProject(req: NextRequest) {
  const auth = requireAdminAuth(req);
  if (!auth.authenticated) {
    return auth.errorResponse!;
  }

  try {
    const body = await req.json();
    const created = await createProjectModel({
      title: body.title,
      tagline: body.tagline || "",
      category: body.category || "General",
      techStack: Array.isArray(body.techStack) ? body.techStack.join(", ") : body.techStack || "",
      metrics: body.metrics || null,
      highlights: typeof body.highlights === "object" ? JSON.stringify(body.highlights) : body.highlights || "[]",
      architectureNotes: body.architectureNotes || null,
      order: body.order,
    });
    syncResumePdf().catch((e) => logMessage("error", "Failed to sync resume PDF:", e));
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: any) {
    logMessage("error", "Error creating project:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create project" },
      { status: 500 }
    );
  }
}

export async function handleUpdateProject(req: NextRequest) {
  const auth = requireAdminAuth(req);
  if (!auth.authenticated) {
    return auth.errorResponse!;
  }

  try {
    const body = await req.json();
    const id = Number(body.id);
    if (!id || isNaN(id)) {
      return NextResponse.json({ success: false, error: "Valid Project ID is required" }, { status: 400 });
    }

    const { id: _ignored, ...data } = body;
    const updatePayload: any = { ...data };
    if (Array.isArray(data.techStack)) {
      updatePayload.techStack = data.techStack.join(", ");
    }
    if (typeof data.highlights === "object") {
      updatePayload.highlights = JSON.stringify(data.highlights);
    }

    const updated = await updateProjectModel(id, updatePayload);
    syncResumePdf().catch((e) => logMessage("error", "Failed to sync resume PDF:", e));
    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error: any) {
    logMessage("error", "Error updating project:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function handleDeleteProject(req: NextRequest) {
  const auth = requireAdminAuth(req);
  if (!auth.authenticated) {
    return auth.errorResponse!;
  }

  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");
    const id = Number(idParam);
    if (!idParam || isNaN(id)) {
      return NextResponse.json({ success: false, error: "Valid Project ID is required" }, { status: 400 });
    }

    await deleteProjectModel(id);
    syncResumePdf().catch((e) => logMessage("error", "Failed to sync resume PDF:", e));
    return NextResponse.json({ success: true, message: "Project deleted successfully" }, { status: 200 });
  } catch (error: any) {
    logMessage("error", "Error deleting project:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete project" },
      { status: 500 }
    );
  }
}
