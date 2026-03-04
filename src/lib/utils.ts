import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function resolveImageUrl(path: string | null | undefined, fallback: string) {
  if (!path) return fallback;
  if (path.startsWith('http')) return path;

  // Use the API URL from environment variables, removing trailing slash if present
  const apiUri = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || "http://127.0.0.1:8000";

  if (path.startsWith('/')) {
    if (path.startsWith('/assets/')) return path;
    if (path.startsWith('/storage/')) return `${apiUri}${path}`;
    return `${apiUri}/storage${path}`; // Assume it's in storage if not an asset
  }

  // For relative paths like "partner_logos/xxx.jpeg"
  return `${apiUri}/storage/${path}`;
}
