import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { getPublishedServices, localize } from "@/lib/data";
import { serviceIcon } from "@/lib/service-icons";
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
  const services = await getPublishedServices();

  return (
    <Section>
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight text-cream sm:text-5xl">
          {t("overviewTitle")}
        </h1>
        <p className="mt-4 text-lg text-cream/80">{t("overviewSubtitle")}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {services.length > 0
          ? services.map((service) => {
              const localized = localize(service, locale, ["title", "description"]);
              const Icon = serviceIcon(service.icon_key);
              const inner = (
                <Card className="h-full">
                  <div className="mb-4 inline-flex rounded-xl bg-royal-bright/10 p-3">
                    <Icon className="h-6 w-6 text-royal-bright" />
                  </div>
                  <h2 className="text-xl font-semibold text-ink">{localized.title}</h2>
                  {localized.description && (
                    <p className="mt-2 text-sm text-ink/70">{localized.description}</p>
                  )}
                </Card>
              );
              return service.link_url ? (
                <a key={service.id} href={service.link_url}>
                  {inner}
                </a>
              ) : (
                <div key={service.id}>{inner}</div>
              );
            })
          : ALL_SERVICE_CATEGORIES.map((category) => {
              const key = categoryToCamel(category);
              const Icon = SERVICE_ICONS[category];
              return (
                <Link key={category} href={`/services/${SERVICE_SLUGS[category]}`}>
                  <Card className="h-full">
                    <div className="mb-4 inline-flex rounded-xl bg-royal-bright/10 p-3">
                      <Icon className="h-6 w-6 text-royal-bright" />
                    </div>
                    <h2 className="text-xl font-semibold">{t(key)}</h2>
                    <p className="mt-2 text-sm text-ink/70">{t(`${key}Desc`)}</p>
                  </Card>
                </Link>
              );
            })}
      </div>
    </Section>
  );
}
