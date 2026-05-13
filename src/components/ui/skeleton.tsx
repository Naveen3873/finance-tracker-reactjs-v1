import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("relative overflow-hidden rounded-xl bg-muted", className)}><div className="absolute inset-y-0 -left-full w-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" /></div>;
}
