import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  ALL_SERVICE_CATEGORIES,
  SERVICE_SLUGS,
  categoryToCamel,
} from "@/lib/services-content";
import type { ServiceCategory } from "@/lib/types";

export default function CategoryFilter({
  active,
}: {
  active?: ServiceCategory;
}) {
  const t = useTranslations("services");
  const tProjects = useTranslations("projects");

  const pillClass = (isActive: boolean) =>
    cn(
      "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
      isActive
        ? "bg-royal-bright text-cream"
        : "bg-ink/10 text-ink/80 hover:bg-ink/20"
    );

  return (
    <div className="flex flex-wrap gap-2">
      <Link href="/projects" className={pillClass(!active)}>
        {tProjects("filterAll")}
      </Link>
      {ALL_SERVICE_CATEGORIES.map((category) => (
        <Link
          key={category}
          href={`/projects?category=${SERVICE_SLUGS[category]}`}
          className={pillClass(active === category)}
        >
          {t(categoryToCamel(category))}
        </Link>
      ))}
    </div>
  );
}
