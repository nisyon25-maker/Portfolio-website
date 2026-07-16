import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/container";
import { Badge } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { getProjectBySlug, localize } from "@/lib/data";
import { categoryToCamel } from "@/lib/services-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  const localized = localize(project, locale, ["title", "summary"]);
  return { title: localized.title, description: localized.summary ?? undefined };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations("projects");
  const tServices = await getTranslations("services");
  const localized = localize(project, locale, [
    "title",
    "summary",
    "problem",
    "solution",
    "outcome",
  ]);

  return (
    <Section>
      <Link
        href="/projects"
        className="text-sm text-ink/60 hover:text-ink"
      >
        ← {t("backToProjects")}
      </Link>

      <Badge className="mt-6 w-fit">
        {tServices(categoryToCamel(project.category))}
      </Badge>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-royal sm:text-5xl">
        {localized.title}
      </h1>
      {localized.summary && (
        <p className="mt-4 max-w-2xl text-lg text-ink/70">
          {localized.summary}
        </p>
      )}

      {project.cover_image_url && (
        <div className="relative mt-10 aspect-video w-full overflow-hidden rounded-2xl bg-royal/5">
          <Image
            src={project.cover_image_url}
            alt={localized.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
        {localized.problem && (
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/60">
              {t("problem")}
            </h2>
            <p className="mt-2 text-ink/80">
              {localized.problem}
            </p>
          </div>
        )}
        {localized.solution && (
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/60">
              {t("solution")}
            </h2>
            <p className="mt-2 text-ink/80">
              {localized.solution}
            </p>
          </div>
        )}
        {localized.outcome && (
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/60">
              {t("outcome")}
            </h2>
            <p className="mt-2 text-ink/80">
              {localized.outcome}
            </p>
          </div>
        )}
      </div>

      {project.tech_stack.length > 0 && (
        <div className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/60">
            {t("techUsed")}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tech_stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-royal/5 px-3 py-1 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {project.gallery_urls.length > 0 && (
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {project.gallery_urls.map((url) => (
            <div
              key={url}
              className="relative aspect-video overflow-hidden rounded-xl bg-royal/5"
            >
              <Image src={url} alt={localized.title} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
