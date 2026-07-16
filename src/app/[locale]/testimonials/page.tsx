import Image from "next/image";
import { Quote } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { getPublishedTestimonials, localize } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "testimonials" });
  return { title: t("title") };
}

export default async function TestimonialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("testimonials");
  const testimonials = await getPublishedTestimonials();

  return (
    <Section>
      <h1 className="font-display text-4xl font-bold tracking-tight text-cream sm:text-5xl">{t("title")}</h1>
      <p className="mt-4 max-w-2xl text-lg text-cream/80">
        {t("subtitle")}
      </p>

      {testimonials.length === 0 ? (
        <p className="mt-12 text-cream/60">{t("empty")}</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {testimonials.map((testimonial) => {
            const localized = localize(testimonial, locale, ["quote"]);
            return (
              <Card key={testimonial.id}>
                <Quote className="h-6 w-6 text-royal/40" />
                <p className="mt-4 text-royal/80">
                  &ldquo;{localized.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  {testimonial.avatar_url && (
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-royal-bright/10">
                      <Image
                        src={testimonial.avatar_url}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-royal">{testimonial.name}</p>
                    <p className="text-xs text-royal/60">
                      {[testimonial.role, testimonial.company]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </Section>
  );
}
