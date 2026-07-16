import { useTranslations } from "next-intl";
import { Code2, Smartphone, Bot, Megaphone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/container";
import type { ServiceCategory } from "@/lib/types";

const SERVICES: { category: ServiceCategory; icon: React.ElementType }[] = [
  { category: "web_development", icon: Code2 },
  { category: "mobile_app_development", icon: Smartphone },
  { category: "ai_business_automation", icon: Bot },
  { category: "digital_marketing", icon: Megaphone },
];

export default function ServicesGrid() {
  const t = useTranslations("home");
  const tServices = useTranslations("services");

  return (
    <Section className="bg-cream">
      <div className="mb-12 text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight text-royal sm:text-5xl">
          {t("servicesTitle")}
        </h2>
        <p className="mt-3 text-ink/70">{t("servicesSubtitle")}</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map(({ category, icon: Icon }) => {
          const camel = toCamel(category);
          return (
            <Link key={category} href={`/services/${category.replace(/_/g, "-")}`}>
              <Card className="h-full">
                <div className="mb-4 inline-flex rounded-xl bg-royal-bright/10 p-3">
                  <Icon className="h-6 w-6 text-royal-bright" />
                </div>
                <h3 className="text-lg font-semibold text-royal">{tServices(camel)}</h3>
                <p className="mt-2 text-sm text-ink/70">{tServices(`${camel}Desc`)}</p>
              </Card>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}

function toCamel(category: ServiceCategory) {
  return category.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());
}
