// src/app/api/resume/route.ts
// Live Dynamic Resume PDF Download Route (Shipowl-style)
// Returns the latest resume generated directly from MySQL data.

import { NextResponse } from "next/server";
import { generateResumePdfBuffer } from "@/utils/resume/resumePdfGenerator";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const pdfBuffer = await generateResumePdfBuffer();
    const uint8 = new Uint8Array(pdfBuffer);

    return new NextResponse(uint8, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Akshay_Kumar_Resume.pdf"',
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error: any) {
    console.error("Failed to generate live resume PDF:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate resume PDF from database" },
      { status: 500 }
    );
  }
}
