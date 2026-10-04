import { NextRequest } from "next/server";
import { handleVerifySession } from "@/app/controllers/authController";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  return handleVerifySession(req);
}
