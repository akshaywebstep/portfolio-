import { NextRequest } from "next/server";
import {
  handleGetEducation,
  handleCreateEducation,
  handleUpdateEducation,
  handleDeleteEducation,
} from "@/app/controllers/educationController";

export const dynamic = "force-dynamic";

export async function GET() {
  return handleGetEducation();
}

export async function POST(req: NextRequest) {
  return handleCreateEducation(req);
}

export async function PUT(req: NextRequest) {
  return handleUpdateEducation(req);
}

export async function DELETE(req: NextRequest) {
  return handleDeleteEducation(req);
}
