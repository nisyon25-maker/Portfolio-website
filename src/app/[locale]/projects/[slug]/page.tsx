import Image from "next/image";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/container";
import { Badge } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { getProjectBySlug, localize } from "@/lib/data";
import { categoryToCamel } from "@/lib/services-content";
import { getProjectCoverImage } from "@/lib/utils";

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
  const coverImage = getProjectCoverImage(project);
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
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        {localized.title}
      </h1>
      {localized.summary && (
        <p className="mt-4 max-w-2xl text-lg text-ink/70">
          {localized.summary}
        </p>
      )}

      {project.project_url && (
        <a
          href={project.project_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-royal-bright px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-royal-bright/90"
        >
          {t("visitProject")}
          <ExternalLink className="h-4 w-4" />
        </a>
      )}

      {coverImage && (
        <div className="relative mt-10 aspect-video w-full overflow-hidden rounded-2xl bg-royal-bright/10">
          <Image
            src={coverImage}
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
                className="rounded-full bg-royal-bright/10 px-3 py-1 text-sm text-ink/70"
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
              className="relative aspect-video overflow-hidden rounded-xl bg-royal-bright/10"
            >
              <Image src={url} alt={localized.title} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
