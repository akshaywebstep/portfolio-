import { NextRequest } from "next/server";
import { handleAdminLogin } from "@/app/controllers/authController";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  return handleAdminLogin(req);
}
