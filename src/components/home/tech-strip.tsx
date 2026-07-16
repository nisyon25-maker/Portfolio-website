import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

const TECH = [
  "Next.js",
  "React",
  "TypeScript",
  "AI / ML",
  "Automation",
  "Google Analytics",
  "Meta Ads",
  "SEO",
  "Supabase",
];

export default function TechStrip() {
  const t = useTranslations("home");

  return (
    <section className="border-b border-royal/10 bg-cream py-14">
      <Container className="text-center">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-royal">
          {t("techTitle")}
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-ink/60">
          {t("techSubtitle")}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {TECH.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-royal/15 bg-white/70 px-4 py-2 text-sm font-medium text-ink/80"
            >
              {tech}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
