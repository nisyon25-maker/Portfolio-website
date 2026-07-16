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
        "rounded-2xl border border-royal/10 bg-cream p-6 text-ink shadow-sm transition duration-200 hover:border-royal-bright/30 hover:shadow-lg",
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
        "inline-flex items-center rounded-full bg-royal-bright/10 px-3 py-1 text-xs font-medium text-royal-bright",
        className
      )}
    >
      {children}
    </span>
  );
}
