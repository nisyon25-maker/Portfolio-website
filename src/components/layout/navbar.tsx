"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./language-switcher";
import { BrandLogo } from "@/components/brand-logo";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const t = useTranslations("nav");
  const tBrand = useTranslations("brand");
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/services", label: t("services") },
    { href: "/projects", label: t("projects") },
    { href: "/blog", label: t("blog") },
    { href: "/testimonials", label: t("testimonials") },
  ];

  return (
    <header className="sticky top-0 z-40 bg-royal-deep text-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-cream" aria-label={tBrand("name")}>
          <BrandLogo className="h-10 w-10" />
          <span className="sr-only">{tBrand("name")}</span>
        </Link>

        {/* Desktop pill nav */}
        <nav className="hidden items-center gap-1 rounded-full border border-cream/25 px-2 py-1.5 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-1.5 text-sm font-medium uppercase tracking-wide text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-royal-bright px-5 py-2 text-sm font-medium text-cream transition-colors hover:bg-royal"
          >
            {t("getInTouch")}
          </Link>
        </div>

        <button
          className="lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-cream/15 px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium uppercase tracking-wide text-cream/85"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="text-sm font-medium uppercase tracking-wide text-cream"
            >
              {t("getInTouch")}
            </Link>
            <LanguageSwitcher />
          </nav>
        </div>
      )}
    </header>
  );
}
