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
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/95 text-ink backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 text-ink" aria-label={tBrand("name")}>
          <BrandLogo className="h-9 w-9 text-royal-bright" />
          <span className="font-display text-xs uppercase tracking-[0.45em] text-ink/80">
            {tBrand("name")}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-[0.22em] text-ink/75 transition hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-royal-bright bg-white px-5 py-2 text-sm font-semibold text-royal-bright transition hover:bg-royal-bright/10"
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
        <div className="border-t border-ink/10 bg-white px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium uppercase tracking-[0.22em] text-ink/75"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-full border border-royal-bright bg-white px-5 py-2 text-sm font-semibold text-royal-bright"
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
