import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import {
  ALL_SERVICE_CATEGORIES,
  SERVICE_ICONS,
  SERVICE_SLUGS,
  categoryToCamel,
} from "@/lib/services-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("overviewTitle") };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  return (
    <Section>
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight text-royal sm:text-5xl">
          {t("overviewTitle")}
        </h1>
        <p className="mt-4 text-lg text-ink/70">
          {t("overviewSubtitle")}
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {ALL_SERVICE_CATEGORIES.map((category) => {
          const key = categoryToCamel(category);
          const Icon = SERVICE_ICONS[category];
          return (
            <Link key={category} href={`/services/${SERVICE_SLUGS[category]}`}>
              <Card className="h-full">
                <Icon className="mb-4 h-8 w-8" />
                <h2 className="text-xl font-semibold">{t(key)}</h2>
                <p className="mt-2 text-sm text-ink/70">
                  {t(`${key}Desc`)}
                </p>
              </Card>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
