import { NextRequest } from "next/server";
import {
  handleGetSkills,
  handleCreateSkill,
  handleUpdateSkill,
  handleDeleteSkill,
} from "@/app/controllers/skillController";

export const dynamic = "force-dynamic";

export async function GET() {
  return handleGetSkills();
}

export async function POST(req: NextRequest) {
  return handleCreateSkill(req);
}

export async function PUT(req: NextRequest) {
  return handleUpdateSkill(req);
}

export async function DELETE(req: NextRequest) {
  return handleDeleteSkill(req);
}
