import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/container";
import ProjectCard from "@/components/projects/project-card";
import CategoryFilter from "@/components/projects/category-filter";
import { getPublishedProjects } from "@/lib/data";
import { SLUG_TO_CATEGORY } from "@/lib/services-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return { title: t("title") };
}

export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  const { category: categorySlug } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("projects");

  const category = categorySlug ? SLUG_TO_CATEGORY[categorySlug] : undefined;
  const projects = await getPublishedProjects(category);

  return (
    <Section>
      <h1 className="font-display text-4xl font-bold tracking-tight text-cream sm:text-5xl">{t("title")}</h1>
      <p className="mt-4 max-w-2xl text-lg text-cream/80">
        {t("subtitle")}
      </p>

      <div className="mt-8">
        <CategoryFilter active={category} />
      </div>

      {projects.length === 0 ? (
        <p className="mt-12 text-ink/60">{t("empty")}</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </Section>
  );
}
