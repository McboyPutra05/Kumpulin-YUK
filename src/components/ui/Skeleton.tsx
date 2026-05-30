// Skeleton.tsx
// ------------
// Komponen loading placeholder yang menampilkan animasi shimmer
// saat konten masih diambil dari server.

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-800",
        className
      )}
    />
  );
}
