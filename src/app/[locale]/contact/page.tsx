import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/container";
import ContactForm from "./contact-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <Section>
      <div className="mx-auto max-w-xl">
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">{t("title")}</h1>
        <p className="mt-4 text-lg text-ink/70">
          {t("subtitle")}
        </p>
        <div className="mt-10">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
