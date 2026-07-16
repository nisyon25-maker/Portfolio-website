import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";

export default function CtaSection() {
  const t = useTranslations("home");

  return (
    <section className="bg-royal-deep py-20 text-cream sm:py-28">
      <Container className="text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {t("ctaTitle")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-cream/75">{t("ctaSubtitle")}</p>
        <div className="mt-8">
          <LinkButton href="/contact">{t("ctaButton")}</LinkButton>
        </div>
      </Container>
    </section>
  );
}
