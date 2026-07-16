import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-royal/15 bg-white/60 p-6 shadow-sm transition-all hover:border-royal/40 hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-royal/10 px-3 py-1 text-xs font-medium text-royal",
        className
      )}
    >
      {children}
    </span>
  );
}
