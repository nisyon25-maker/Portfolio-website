import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { getSiteSetting } from "@/lib/data";
import { ALL_SERVICE_CATEGORIES, categoryToCamel } from "@/lib/services-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tServices = await getTranslations("services");
  const resume = (await getSiteSetting("resume")) as { url?: string } | null;

  return (
    <Section>
      <h1 className="font-display text-4xl font-bold tracking-tight text-cream sm:text-5xl">{t("title")}</h1>
      <p className="mt-6 max-w-3xl text-lg text-cream/80">
        {tServices("overviewSubtitle")}
      </p>

      <h2 className="mt-16 text-2xl font-semibold text-cream">{t("skillsTitle")}</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {ALL_SERVICE_CATEGORIES.map((category) => {
          const key = categoryToCamel(category);
          return (
            <Card key={category}>
              <h3 className="font-semibold text-royal">{tServices(key)}</h3>
              <p className="mt-2 text-sm text-royal/70">
                {tServices(`${key}Desc`)}
              </p>
            </Card>
          );
        })}
      </div>

      <div className="mt-16 rounded-2xl border border-cream/20 bg-cream p-8 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-royal">{t("resumeTitle")}</h2>
        <p className="mt-2 text-royal/70">
          {t("resumeDesc")}
        </p>
        {resume?.url ? (
          <a
            href={resume.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-royal-bright px-6 py-3 text-sm font-semibold text-cream transition hover:bg-royal-bright/90"
          >
            {t("downloadResume")}
          </a>
        ) : (
          <p className="mt-6 text-sm text-ink/50">{t("resumeUnavailable")}</p>
        )}
      </div>
    </Section>
  );
}
