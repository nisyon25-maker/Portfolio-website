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
      {/* soft glow accents */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-royal-bright/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-royal/50 blur-3xl" />

      <Container className="relative py-14 lg:flex lg:min-h-[90vh] lg:items-center lg:py-0">
        <div className="grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-6">
          {/* Left — greeting + name + role + CTAs */}
          <div className="order-2 text-center lg:order-1 lg:col-span-5 lg:text-left">
            <h1 className="font-display leading-[0.95]">
              <span className="block text-2xl font-medium text-cream/80 sm:text-3xl">
                {t("heroGreeting")}
              </span>
              <span className="mt-2 block text-5xl font-bold sm:text-6xl lg:text-7xl lg:-mr-24 lg:relative lg:z-20">
                {tBrand("name")}
                <span className="text-royal-bright">.</span>
              </span>
            </h1>

            <p className="mt-6 font-display text-xl italic text-cream/70 sm:text-2xl">
              {tBrand("tagline")}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <LinkButton href="/contact">{t("heroCta")}</LinkButton>
              <LinkButton href="/projects" variant="secondary">
                {t("heroSecondaryCta")}
              </LinkButton>
            </div>
          </div>

          {/* Center — portrait (transparent cut-out, floats on the royal bg) */}
          <div className="order-1 flex justify-center lg:order-2 lg:col-span-4 lg:z-10">
            <div className="relative aspect-[3/4] w-64 sm:w-80 lg:w-full">
              {/* soft halo behind the subject */}
              <div className="pointer-events-none absolute inset-x-4 bottom-0 top-8 rounded-full bg-royal-bright/20 blur-3xl" />
              <Image
                src="/portrait.png"
                alt={tBrand("name")}
                fill
                priority
                sizes="(max-width: 1024px) 20rem, 22rem"
                className="relative object-contain object-bottom drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Right — eyebrow + bio + contact */}
          <div className="order-3 space-y-8 text-center lg:col-span-3 lg:z-20 lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/60">
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
