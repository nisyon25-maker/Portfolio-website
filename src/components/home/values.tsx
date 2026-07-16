import { useTranslations } from "next-intl";
import { Globe, TrendingUp, Bot, Handshake } from "lucide-react";
import { Container } from "@/components/ui/container";

const ICONS = [Globe, TrendingUp, Bot, Handshake];

export default function Values() {
  const t = useTranslations("home");
  const tv = useTranslations("values");
  const items = tv.raw("items") as { title: string; desc: string }[];

  return (
    <section className="bg-cream py-16 sm:py-24">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight text-royal sm:text-5xl">
            {t("valuesTitle")}
          </h2>
          <p className="mt-3 text-ink/70">{t("valuesSubtitle")}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? Globe;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-royal/15 bg-white/60 p-6"
              >
                <div className="mb-4 inline-flex rounded-xl bg-royal/10 p-3">
                  <Icon className="h-6 w-6 text-royal" />
                </div>
                <h3 className="font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
