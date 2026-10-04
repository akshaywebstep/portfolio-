import { handleAdminLogout } from "@/app/controllers/authController";

export const dynamic = "force-dynamic";

export async function POST() {
  return handleAdminLogout();
}
