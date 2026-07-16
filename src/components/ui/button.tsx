import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-full bg-royal-bright px-6 py-3 text-sm font-semibold text-cream transition-colors duration-200 hover:bg-royal-bright/90",
  secondary:
    "inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-6 py-3 text-sm font-semibold text-cream transition-colors duration-200 hover:border-cream hover:bg-cream/15",
  ghost:
    "inline-flex items-center justify-center gap-2 rounded-full bg-transparent px-6 py-3 text-sm font-semibold text-cream/80 transition-colors duration-200 hover:text-cream",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none";

export function Button({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button
      className={cn(base, variantClasses[variant], className)}
      {...props}
    />
  );
}

export function LinkButton({
  variant = "primary",
  className,
  href,
  children,
}: {
  variant?: Variant;
  className?: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={cn(base, variantClasses[variant], className)}>
      {children}
    </Link>
  );
}
