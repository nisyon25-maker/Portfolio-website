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
    <section className="relative overflow-hidden text-cream">

      <Container className="relative py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_420px_minmax(0,0.7fr)] lg:items-center">
          <div className="space-y-8 text-center lg:text-left animate-fade-up">
            <p className="text-sm uppercase tracking-[0.35em] text-cream/80">
              {t("heroGreeting")}
            </p>

            <div className="overflow-hidden">
              <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] uppercase tracking-[0.14em] leading-[0.95] text-cream drop-shadow-[0_10px_36px_rgba(0,0,0,0.3)]">
                {tBrand("name")}
              </h1>
            </div>

            <p className="max-w-2xl text-xl leading-[1.35] text-cream/95 sm:text-2xl">
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

          <div className="relative mx-auto w-full max-w-[30rem] animate-fade-up animate-fade-up-delay-200">
            <Image
              src="/portrait.png"
              alt={tBrand("name")}
              width={780}
              height={980}
              priority
              className="h-[520px] w-full object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.28)] transition-transform duration-1000 ease-out hover:scale-[1.02]"
            />
          </div>

          <div className="space-y-8 text-center lg:text-left animate-fade-up animate-fade-up-delay-300">
            <p className="text-xs uppercase tracking-[0.28em] text-cream/75">
              {t("heroEyebrow")}
            </p>

            <p className="mx-auto max-w-sm text-sm leading-relaxed text-cream/80 lg:mx-0">
              {t("heroBio")}
            </p>

            <ul className="mx-auto flex max-w-sm flex-col items-center gap-3 text-sm text-cream/95 lg:mx-0 lg:items-start">
              <li className="flex items-center gap-3 text-cream/95">
                <MapPin className="h-4 w-4 shrink-0 text-cream" />
                <span>{contact.location}</span>
              </li>
              <li className="flex items-center gap-3 text-cream/95">
                <Phone className="h-4 w-4 shrink-0 text-cream" />
                <a href={telHref(contact.phone)} className="text-cream/100 transition hover:text-cream">
                  {contact.phone}
                </a>
              </li>
              {contact.whatsapp && (
                <li className="flex items-center gap-3 text-cream/95">
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-cream" />
                  <a
                    href={whatsappHref(contact.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream/100 transition hover:text-cream"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>

            <SocialLinks
              socials={socials}
              className="justify-center text-cream/85 lg:justify-start"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
