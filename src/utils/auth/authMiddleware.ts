// src/utils/auth/authMiddleware.ts
// Route Authentication Guard (Shipowl-style)

import { NextRequest, NextResponse } from "next/server";
import { verifyToken, AdminPayload } from "./authUtils";

export interface AuthCheckResult {
  authenticated: boolean;
  user?: AdminPayload;
  errorResponse?: NextResponse;
}

/**
 * Validates JWT token from Authorization header (Bearer <token>) or HTTP-only cookie.
 * Use in route controllers to protect admin mutation endpoints.
 */
export function requireAdminAuth(req: NextRequest): AuthCheckResult {
  const authHeader = req.headers.get("authorization");
  let token = "";

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7).trim();
  } else {
    token = req.cookies.get("portfolio_admin_token")?.value || "";
  }

  if (!token) {
    return {
      authenticated: false,
      errorResponse: NextResponse.json(
        { success: false, error: "Access denied. Authentication token required." },
        { status: 401 }
      ),
    };
  }

  const result = verifyToken(token);
  if (!result.valid || !result.payload) {
    return {
      authenticated: false,
      errorResponse: NextResponse.json(
        { success: false, error: result.error || "Session expired or invalid token. Please log in again." },
        { status: 401 }
      ),
    };
  }

  return {
    authenticated: true,
    user: result.payload,
  };
}
