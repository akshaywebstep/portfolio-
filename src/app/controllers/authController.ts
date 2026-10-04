// src/app/controllers/authController.ts
// Admin Authentication Controller (Shipowl-style)

import { NextRequest, NextResponse } from "next/server";
import { validateAdminCredentials } from "@/app/models/admin";
import { generateToken, verifyToken } from "@/utils/auth/authUtils";
import { logMessage } from "@/utils/commonUtils";

export async function handleAdminLogin(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    const admin = await validateAdminCredentials(email, password);
    if (!admin) {
      logMessage("warn", `Failed login attempt for: ${email}`);
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = generateToken(admin);
    logMessage("info", `Admin logged in successfully: ${admin.email}`);

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        token,
        user: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        },
      },
      { status: 200 }
    );

    // Set secure cookie as well for session persistence
    response.cookies.set("portfolio_admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    logMessage("error", "Login error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error during login" },
      { status: 500 }
    );
  }
}

export async function handleVerifySession(req: NextRequest) {
  try {
    // Check Authorization header first
    const authHeader = req.headers.get("authorization");
    let token = "";
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else {
      // Fallback to cookie
      token = req.cookies.get("portfolio_admin_token")?.value || "";
    }

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Authentication token missing" },
        { status: 401 }
      );
    }

    const result = verifyToken(token);
    if (!result.valid || !result.payload) {
      return NextResponse.json(
        { success: false, error: result.error || "Invalid or expired session" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: result.payload,
      },
      { status: 200 }
    );
  } catch (error: any) {
    logMessage("error", "Verify session error:", error);
    return NextResponse.json(
      { success: false, error: "Session verification failed" },
      { status: 500 }
    );
  }
}

export async function handleAdminLogout() {
  const response = NextResponse.json(
    { success: true, message: "Logged out successfully" },
    { status: 200 }
  );

  response.cookies.set("portfolio_admin_token", "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });

  return response;
}
