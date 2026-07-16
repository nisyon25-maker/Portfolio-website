import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SocialLinks } from "@/components/social-links";
import { getSiteContact, getSiteSocials } from "@/lib/data";
import { telHref, whatsappHref } from "@/lib/site-config";

export default async function Hero() {
  const t = await getTranslations("home");
  const tBrand = await getTranslations("brand");
  const [contact, socials] = await Promise.all([
    getSiteContact(),
    getSiteSocials(),
  ]);

  return (
    <section className="relative overflow-hidden bg-royal-deep text-cream">
      <div className="pointer-events-none absolute -left-28 top-8 h-72 w-72 rounded-full bg-royal-bright/30 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-28 h-72 w-72 rounded-full bg-royal/40 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-royal-bright/10 blur-3xl" />

      <Container className="relative py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_420px_minmax(0,0.65fr)] lg:items-center">
          <div className="space-y-8 text-center lg:text-left animate-fade-up">
            <p className="text-sm uppercase tracking-[0.35em] text-cream/60">
              {t("heroGreeting")}
            </p>

            <div className="overflow-hidden">
              <h1 className="font-display text-5xl uppercase tracking-[0.35em] leading-[0.95] text-cream sm:text-6xl lg:text-7xl">
                {tBrand("name")}
              </h1>
            </div>

            <p className="max-w-2xl text-xl leading-tight text-cream/80 sm:text-2xl">
              {tBrand("tagline")}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start">
              <LinkButton className="animate-fade-up" href="/contact">
                {t("heroCta")}
              </LinkButton>
              <LinkButton
                href="/projects"
                variant="secondary"
                className="animate-fade-up animate-fade-up-delay-150"
              >
                {t("heroSecondaryCta")}
              </LinkButton>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[28rem] animate-fade-up animate-fade-up-delay-200">
            <div className="absolute inset-x-0 bottom-0 h-60 rounded-[2.5rem] bg-cream/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-cream/20 bg-royal/5 shadow-[0_35px_90px_rgba(0,0,0,0.22)]">
              <Image
                src="/new img.jpeg"
                alt={tBrand("name")}
                width={780}
                height={980}
                priority
                className="h-[520px] w-full object-cover transition-transform duration-1000 ease-out hover:scale-[1.03]"
              />
            </div>
          </div>

          <div className="space-y-8 text-center lg:text-left animate-fade-up animate-fade-up-delay-300">
            <p className="text-xs uppercase tracking-[0.28em] text-cream/60">
              {t("heroEyebrow")}
            </p>

            <p className="mx-auto max-w-sm text-sm leading-relaxed text-cream/80 lg:mx-0">
              {t("heroBio")}
            </p>

            <ul className="mx-auto flex max-w-sm flex-col items-center gap-3 text-sm lg:mx-0 lg:items-start">
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-royal-bright" />
                <span>{contact.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-royal-bright" />
                <a href={telHref(contact.phone)} className="hover:text-cream">
                  {contact.phone}
                </a>
              </li>
              {contact.whatsapp && (
                <li className="flex items-center gap-3">
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-royal-bright" />
                  <a
                    href={whatsappHref(contact.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cream"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>

            <SocialLinks
              socials={socials}
              className="justify-center text-cream/80 lg:justify-start"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
