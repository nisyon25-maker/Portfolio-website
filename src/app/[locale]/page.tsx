import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/home/hero";
import TechStrip from "@/components/home/tech-strip";
import Values from "@/components/home/values";
import ServicesGrid from "@/components/home/services-grid";
import Process from "@/components/home/process";
import FeaturedProjects from "@/components/home/featured-projects";
import TestimonialsPreview from "@/components/home/testimonials-preview";
import CtaSection from "@/components/home/cta-section";
import { getFeaturedProjects } from "@/lib/data";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const projects = await getFeaturedProjects();

  return (
    <>
      <Hero />
      <TechStrip />
      <Values />
      <ServicesGrid />
      <Process />
      <FeaturedProjects projects={projects} />
      <TestimonialsPreview />
      <CtaSection />
    </>
  );
}
