import { SOCIAL_ICONS } from "@/components/icons/socials";
import { SOCIAL_PLATFORMS, type SocialsConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Renders an icon link for every configured social platform, in a stable order. */
export function SocialLinks({
  socials,
  className,
  iconClassName,
}: {
  socials: SocialsConfig;
  className?: string;
  iconClassName?: string;
}) {
  const entries = SOCIAL_PLATFORMS.filter((p) => socials[p.key]);
  if (entries.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {entries.map((platform) => {
        const Icon = SOCIAL_ICONS[platform.key];
        return (
          <a
            key={platform.key}
            href={socials[platform.key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform.label}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-current/25 transition-colors hover:border-current"
          >
            {Icon ? <Icon className={cn("h-4 w-4", iconClassName)} /> : platform.label}
          </a>
        );
      })}
    </div>
  );
}
