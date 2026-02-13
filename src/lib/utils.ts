import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function resolveImageUrl(path: string | null | undefined, fallback: string) {
  if (!path) return fallback;
  if (path.startsWith('http')) return path;

  const backendUrl = "http://admin.albertinecommunity.org";

  if (path.startsWith('/')) {
    if (path.startsWith('/assets/')) return path;
    if (path.startsWith('/storage/')) return `${backendUrl}${path}`;
    return `${backendUrl}/storage${path}`; // Assume it's in storage if not an asset
  }

  // For relative paths like "partner_logos/xxx.jpeg"
  return `${backendUrl}/storage/${path}`;
}
