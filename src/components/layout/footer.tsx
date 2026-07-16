import { getTranslations } from "next-intl/server";
import { MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { BrandLogo } from "@/components/brand-logo";
import { SocialLinks } from "@/components/social-links";
import { Link } from "@/i18n/navigation";
import { getSiteContact, getSiteSocials } from "@/lib/data";
import { telHref, whatsappHref } from "@/lib/site-config";

export default async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tBrand = await getTranslations("brand");
  const [contact, socials] = await Promise.all([
    getSiteContact(),
    getSiteSocials(),
  ]);

  return (
    <footer className="mt-auto bg-royal-deep text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <BrandLogo className="h-10 w-10 text-cream" />
            <p className="font-display text-2xl font-bold">{tBrand("name")}</p>
          </div>
          <p className="mt-3 max-w-xs text-sm text-cream/70">{tBrand("tagline")}</p>
          <SocialLinks socials={socials} className="mt-6 text-cream/80" />
        </div>

        <nav className="flex flex-col gap-3 text-sm text-cream/70">
          <Link href="/about" className="hover:text-cream">{tNav("about")}</Link>
          <Link href="/services" className="hover:text-cream">{tNav("services")}</Link>
          <Link href="/projects" className="hover:text-cream">{tNav("projects")}</Link>
          <Link href="/blog" className="hover:text-cream">{tNav("blog")}</Link>
          <Link href="/contact" className="hover:text-cream">{tNav("contact")}</Link>
        </nav>

        <ul className="flex flex-col gap-3 text-sm text-cream/70">
          <li className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-royal-bright" />
            {contact.location}
          </li>
          <li className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-royal-bright" />
            <a href={telHref(contact.phone)} className="hover:text-cream">
              {contact.phone}
            </a>
          </li>
          {contact.whatsapp && (
            <li className="flex items-center gap-2">
              <WhatsAppIcon className="h-4 w-4 text-royal-bright" />
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
      </div>

      <div className="border-t border-cream/15">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-cream/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {tBrand("name")}. {t("rights")}</p>
          <p>{t("builtWith")}</p>
        </div>
      </div>
    </footer>
  );
}
