// src/app/controllers/profileController.ts
// Profile Controller (Shipowl-style)

import { NextRequest, NextResponse } from "next/server";
import { getProfileModel, updateProfileModel } from "@/app/models/profile";
import { requireAdminAuth } from "@/utils/auth/authMiddleware";
import { logMessage } from "@/utils/commonUtils";

import { syncResumePdf } from "@/utils/resume/resumePdfGenerator";

export async function handleGetProfile() {
  try {
    const profile = await getProfileModel();
    return NextResponse.json({ success: true, data: profile }, { status: 200 });
  } catch (error: any) {
    logMessage("error", "Error fetching profile:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function handleUpdateProfile(req: NextRequest) {
  const auth = requireAdminAuth(req);
  if (!auth.authenticated) {
    return auth.errorResponse!;
  }

  try {
    const body = await req.json();
    const updated = await updateProfileModel(body);
    logMessage("info", `Profile updated by admin ${auth.user?.email}`);
    syncResumePdf().catch((e) => logMessage("error", "Failed to sync resume PDF:", e));
    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error: any) {
    logMessage("error", "Error updating profile:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update profile" },
      { status: 500 }
    );
  }
}
