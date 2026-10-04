import { NextRequest } from "next/server";
import { handleGetProfile, handleUpdateProfile } from "@/app/controllers/profileController";

export const dynamic = "force-dynamic";

export async function GET() {
  return handleGetProfile();
}

export async function PUT(req: NextRequest) {
  return handleUpdateProfile(req);
}
