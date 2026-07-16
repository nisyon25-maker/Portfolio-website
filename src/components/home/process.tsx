import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

export default function Process() {
  const t = useTranslations("home");
  const tp = useTranslations("process");
  const steps = tp.raw("steps") as { title: string; desc: string }[];

  return (
    <section className="bg-cream py-16 sm:py-24">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight text-royal sm:text-5xl">
            {t("processTitle")}
          </h2>
          <p className="mt-3 text-cream/80">{t("processSubtitle")}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="relative">
              <span className="font-display text-5xl font-bold text-royal-bright/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-royal">{step.title}</h3>
              <p className="mt-2 text-sm text-cream/80">{step.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
