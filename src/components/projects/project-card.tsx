import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, Badge } from "@/components/ui/card";
import { localize } from "@/lib/data";
import type { Project } from "@/lib/types";
import { getProjectCoverImage } from "@/lib/utils";

export default function ProjectCard({ project }: { project: Project }) {
  const tServices = useTranslations("services");
  const locale = useLocale();
  const localized = localize(project, locale, ["title", "summary"]);
  const coverImage = getProjectCoverImage(project);
  const categoryKey = project.category.replace(/_([a-z])/g, (_, c: string) =>
    c.toUpperCase()
  );

  return (
    <Link href={`/projects/${project.slug}`}>
      <Card className="flex h-full flex-col overflow-hidden p-0">
        <div className="relative aspect-video w-full bg-royal-bright/10">
          {coverImage && (
            <Image
              src={coverImage}
              alt={localized.title}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <Badge className="mb-3 w-fit bg-royal-bright/10 text-royal-bright">
            {tServices(categoryKey)}
          </Badge>
          <h3 className="text-lg font-semibold text-royal">{localized.title}</h3>
          {localized.summary && (
            <p className="mt-2 line-clamp-3 text-sm text-royal/70">
              {localized.summary}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}
