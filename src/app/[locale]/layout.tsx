import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getSiteSeo } from "@/lib/data";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import SetHtmlLang from "@/components/set-html-lang";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "brand" });
  const seo = await getSiteSeo();

  return {
    title: {
      default: seo.title || `${t("name")} — ${t("tagline")}`,
      template: `%s — ${t("name")}`,
    },
    description: seo.description,
    keywords: seo.keywords || undefined,
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: seo.ogImageUrl ? [seo.ogImageUrl] : undefined,
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} flex min-h-screen flex-col bg-cream font-sans text-ink`}
    >
      <NextIntlClientProvider>
        <SetHtmlLang locale={locale} />
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={null}>
            <PageTransition>{children}</PageTransition>
          </Suspense>
        </main>
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}
