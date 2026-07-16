import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/container";
import ProjectCard from "@/components/projects/project-card";
import { getPublishedProjects } from "@/lib/data";
import {
  SERVICE_ICONS,
  SLUG_TO_CATEGORY,
  categoryToCamel,
  ALL_SERVICE_CATEGORIES,
  SERVICE_SLUGS,
} from "@/lib/services-content";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    ALL_SERVICE_CATEGORIES.map((category) => ({
      locale,
      category: SERVICE_SLUGS[category],
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category: slug } = await params;
  const category = SLUG_TO_CATEGORY[slug];
  if (!category) return {};
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t(categoryToCamel(category)) };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category: slug } = await params;
  const category = SLUG_TO_CATEGORY[slug];
  if (!category) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("services");
  const key = categoryToCamel(category);
  const Icon = SERVICE_ICONS[category];
  const capabilities = t.raw(`${key}Capabilities`) as string[];
  const tools = t.raw(`${key}Tools`) as string[];
  const projects = await getPublishedProjects(category);

  return (
    <Section>
      <Icon className="h-10 w-10 text-royal-bright" />
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-cream sm:text-5xl">{t(key)}</h1>
      <p className="mt-4 max-w-2xl text-lg text-cream/80">
        {t(`${key}Desc`)}
      </p>

      <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold">{t("capabilities")}</h2>
          <ul className="mt-4 space-y-2">
            {capabilities.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-cream/80"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cream/70" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold">{t("toolsAndTech")}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full bg-cream/10 px-3 py-1 text-sm text-cream"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {projects.length > 0 && (
        <div className="mt-16">
          <h2 className="text-lg font-semibold">{t("relatedCaseStudies")}</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
