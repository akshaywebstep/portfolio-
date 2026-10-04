// src/app/controllers/skillController.ts
// Skill Controller (Shipowl-style)

import { NextRequest, NextResponse } from "next/server";
import {
  getAllSkillCategoriesModel,
  createSkillCategoryModel,
  updateSkillCategoryModel,
  deleteSkillCategoryModel,
} from "@/app/models/skill";
import { requireAdminAuth } from "@/utils/auth/authMiddleware";
import { logMessage } from "@/utils/commonUtils";
import { syncResumePdf } from "@/utils/resume/resumePdfGenerator";

export async function handleGetSkills() {
  try {
    const skills = await getAllSkillCategoriesModel();
    return NextResponse.json({ success: true, data: skills }, { status: 200 });
  } catch (error: any) {
    logMessage("error", "Error fetching skills:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

export async function handleCreateSkill(req: NextRequest) {
  const auth = requireAdminAuth(req);
  if (!auth.authenticated) {
    return auth.errorResponse!;
  }

  try {
    const body = await req.json();
    const created = await createSkillCategoryModel({
      name: body.name,
      icon: body.icon || "Code2",
      skills: Array.isArray(body.skills) ? body.skills.join(", ") : body.skills || "",
      order: body.order,
    });
    syncResumePdf().catch((e) => logMessage("error", "Failed to sync resume PDF:", e));
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: any) {
    logMessage("error", "Error creating skill category:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create skill category" },
      { status: 500 }
    );
  }
}

export async function handleUpdateSkill(req: NextRequest) {
  const auth = requireAdminAuth(req);
  if (!auth.authenticated) {
    return auth.errorResponse!;
  }

  try {
    const body = await req.json();
    const id = Number(body.id);
    if (!id || isNaN(id)) {
      return NextResponse.json({ success: false, error: "Valid skill category ID is required" }, { status: 400 });
    }

    const { id: _ignored, ...data } = body;
    const updatePayload: any = { ...data };
    if (Array.isArray(data.skills)) {
      updatePayload.skills = data.skills.join(", ");
    }

    const updated = await updateSkillCategoryModel(id, updatePayload);
    syncResumePdf().catch((e) => logMessage("error", "Failed to sync resume PDF:", e));
    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error: any) {
    logMessage("error", "Error updating skill category:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update skill category" },
      { status: 500 }
    );
  }
}

export async function handleDeleteSkill(req: NextRequest) {
  const auth = requireAdminAuth(req);
  if (!auth.authenticated) {
    return auth.errorResponse!;
  }

  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");
    const id = Number(idParam);
    if (!idParam || isNaN(id)) {
      return NextResponse.json({ success: false, error: "Valid skill category ID is required" }, { status: 400 });
    }

    await deleteSkillCategoryModel(id);
    syncResumePdf().catch((e) => logMessage("error", "Failed to sync resume PDF:", e));
    return NextResponse.json({ success: true, message: "Skill category deleted successfully" }, { status: 200 });
  } catch (error: any) {
    logMessage("error", "Error deleting skill category:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete skill category" },
      { status: 500 }
    );
  }
}
