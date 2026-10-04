import { NextRequest } from "next/server";
import {
  handleGetExperiences,
  handleCreateExperience,
  handleUpdateExperience,
  handleDeleteExperience,
} from "@/app/controllers/experienceController";

export const dynamic = "force-dynamic";

export async function GET() {
  return handleGetExperiences();
}

export async function POST(req: NextRequest) {
  return handleCreateExperience(req);
}

export async function PUT(req: NextRequest) {
  return handleUpdateExperience(req);
}

export async function DELETE(req: NextRequest) {
  return handleDeleteExperience(req);
}
