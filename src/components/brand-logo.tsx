import { cn } from "@/lib/utils";

/**
 * NY monogram mark. Uses `currentColor` so it inherits the surrounding text
 * color (cream on the dark navbar, royal on the cream footer).
 *
 * NOTE: This is a vector recreation of the supplied logo. To use the exact
 * brand file instead, drop it at `public/logo.png` (or `.svg`) and swap this
 * component for a <Image src="/logo.png" .../> — see the navbar/footer.
 */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-9 w-9", className)}
    >
      {/* N — left stem */}
      <path d="M40 34 V88" />
      {/* N — diagonal */}
      <path d="M40 34 L74 88" />
      {/* N / Y — right stem rising into the flag */}
      <path d="M74 88 V52" />
      {/* Y — triangular flag / arrow at top right */}
      <path d="M62 32 L92 32 L74 56" />
    </svg>
  );
}
