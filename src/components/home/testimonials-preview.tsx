import Image from "next/image";
import { Quote } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { getPublishedTestimonials, localize } from "@/lib/data";

export default async function TestimonialsPreview() {
  const testimonials = await getPublishedTestimonials();
  if (testimonials.length === 0) return null;

  const locale = await getLocale();
  const t = await getTranslations("home");

  return (
    <section className="bg-cream py-16 sm:py-24">
      <Container>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-4xl font-bold tracking-tight text-royal sm:text-5xl">
              {t("testimonialsTitle")}
            </h2>
            <p className="mt-3 text-ink/70">{t("testimonialsSubtitle")}</p>
          </div>
          <LinkButton href="/testimonials" variant="secondary">
            {t("viewAllTestimonials")}
          </LinkButton>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial) => {
            const localized = localize(testimonial, locale, ["quote"]);
            return (
              <div
                key={testimonial.id}
                className="rounded-2xl border border-royal/15 bg-white/60 p-6"
              >
                <Quote className="h-6 w-6 text-royal/40" />
                <p className="mt-4 text-ink/80">&ldquo;{localized.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  {testimonial.avatar_url && (
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-royal/10">
                      <Image
                        src={testimonial.avatar_url}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
                    <p className="text-xs text-ink/60">
                      {[testimonial.role, testimonial.company].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
