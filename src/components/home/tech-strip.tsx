import { useTranslations } from "next-intl";
import {
  Triangle,
  Atom,
  Braces,
  Brain,
  Workflow,
  LineChart,
  Megaphone,
  Search,
  Database,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";

const TECH: { name: string; icon: LucideIcon; desc: string }[] = [
  { name: "Next.js", icon: Triangle, desc: "React framework for fast, SEO-ready websites." },
  { name: "React", icon: Atom, desc: "Interactive, component-based user interfaces." },
  { name: "TypeScript", icon: Braces, desc: "Typed JavaScript for safer, scalable code." },
  { name: "AI / ML", icon: Brain, desc: "Smart automation and predictive features." },
  { name: "Automation", icon: Workflow, desc: "Workflows that remove repetitive manual work." },
  { name: "Google Analytics", icon: LineChart, desc: "Traffic and user-behaviour insights." },
  { name: "Meta Ads", icon: Megaphone, desc: "Targeted Facebook & Instagram campaigns." },
  { name: "SEO", icon: Search, desc: "Higher rankings and more organic traffic." },
  { name: "Supabase", icon: Database, desc: "Postgres database, auth, and storage." },
];

export default function TechStrip() {
  const t = useTranslations("home");

  return (
    <section className="border-b border-royal/10 bg-cream py-16 sm:py-20">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-royal-bright">
            {t("techTitle")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-ink/70">
            {t("techSubtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TECH.map(({ name, icon: Icon, desc }) => (
            <div
              key={name}
              className="flex items-start gap-4 rounded-2xl border border-royal/10 bg-white p-5 shadow-sm transition hover:border-royal-bright/30 hover:shadow-md"
            >
              <div className="inline-flex shrink-0 rounded-xl bg-royal-bright/10 p-3">
                <Icon className="h-5 w-5 text-royal-bright" />
              </div>
              <div>
                <h3 className="font-semibold text-royal">{name}</h3>
                <p className="mt-1 text-sm text-ink/70">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
