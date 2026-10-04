import { NextRequest } from "next/server";
import {
  handleGetProjects,
  handleCreateProject,
  handleUpdateProject,
  handleDeleteProject,
} from "@/app/controllers/projectController";

export const dynamic = "force-dynamic";

export async function GET() {
  return handleGetProjects();
}

export async function POST(req: NextRequest) {
  return handleCreateProject(req);
}

export async function PUT(req: NextRequest) {
  return handleUpdateProject(req);
}

export async function DELETE(req: NextRequest) {
  return handleDeleteProject(req);
}
