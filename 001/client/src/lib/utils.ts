import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to get the correct asset path for production deployment
export function getAssetPath(path: string): string {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    // For production deployment with base path
    if (hostname.includes('github.io') || hostname === 'ogarsh.tech') {
      return `/cattle.ai${path}`;
    }
  }
  return path;
}
