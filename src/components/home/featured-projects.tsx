import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import ProjectCard from "@/components/projects/project-card";
import type { Project } from "@/lib/types";

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  const t = useTranslations("home");

  if (projects.length === 0) return null;

  return (
    <Section className="border-t border-cream/20 bg-cream">
      <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-4xl font-bold tracking-tight text-royal sm:text-5xl">
            {t("featuredProjectsTitle")}
          </h2>
          <p className="mt-3 text-ink/70">{t("featuredProjectsSubtitle")}</p>
        </div>
        <LinkButton href="/projects" variant="secondary">
          {t("viewAllProjects")}
        </LinkButton>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
