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
        "rounded-2xl border border-ink/10 bg-white p-6 shadow-sm transition duration-200 hover:border-royal-bright/20 hover:shadow-lg",
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
