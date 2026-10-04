/**
 * General Utilities & Environment Helpers (Shipowl-style)
 */

export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}

// Strip trailing slash if present
const rawAppUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();

export const APP_URL: string =
  rawAppUrl && rawAppUrl.length > 0
    ? rawAppUrl.replace(/\/+$/, "")
    : typeof window !== "undefined" && window.location.origin
    ? window.location.origin
    : "http://localhost:3000";

/**
 * Returns full API URL for a given path using NEXT_PUBLIC_APP_URL
 * @param path e.g. "/api/profile"
 */
export function getApiEndpoint(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${APP_URL}${cleanPath}`;
}
