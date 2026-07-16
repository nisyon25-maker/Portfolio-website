"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useParams } from "next/navigation";

const LOCALE_LABELS: Record<string, string> = {
  en: "EN",
  ne: "ने",
};

export default function LanguageSwitcher() {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="sr-only">{t("language")}</span>
      <select
        value={locale}
        onChange={(e) => {
          router.replace(
            // @ts-expect-error dynamic route params passthrough
            { pathname, params },
            { locale: e.target.value }
          );
        }}
        className="rounded-full border border-current/30 bg-transparent px-3 py-1.5 text-sm"
        aria-label={t("language")}
      >
        {routing.locales.map((l) => (
          <option key={l} value={l} className="text-royal">
            {LOCALE_LABELS[l] ?? l}
          </option>
        ))}
      </select>
    </label>
  );
}
