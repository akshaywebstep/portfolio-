// src/utils/auth/authUtils.ts
// JWT & Password Authentication Helpers (Shipowl-style)

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "akshay_portfolio_jwt_secret_key_2026_super_secure_random";

export interface AdminPayload {
  id: number;
  email: string;
  name: string;
  role: string;
}

/**
 * Generate a JWT token for authenticated admin
 */
export function generateToken(admin: AdminPayload, expiresIn: any = "7d"): string {
  return jwt.sign(
    {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    },
    JWT_SECRET,
    { expiresIn } as jwt.SignOptions
  );
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): { valid: boolean; payload?: AdminPayload; error?: string } {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminPayload;
    return { valid: true, payload: decoded };
  } catch (error: any) {
    let msg = "Invalid or expired token";
    if (error.name === "TokenExpiredError") {
      msg = "Session expired. Please log in again.";
    }
    return { valid: false, error: msg };
  }
}

/**
 * Hash a plain password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compare plain password against bcrypt hash
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
