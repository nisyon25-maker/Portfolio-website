import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/container";
import { Badge } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { getBlogPostBySlug, localize } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  const localized = localize(post, locale, ["title", "excerpt"]);
  return { title: localized.title, description: localized.excerpt ?? undefined };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const t = await getTranslations("blog");
  const localized = localize(post, locale, ["title", "excerpt", "content"]);

  return (
    <Section>
      <Link
        href="/blog"
        className="text-sm text-ink/60 hover:text-ink"
      >
        ← {t("backToBlog")}
      </Link>

      <div className="mt-6 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-royal sm:text-5xl">
        {localized.title}
      </h1>
      {post.published_at && (
        <p className="mt-3 text-sm text-ink/50">
          {formatDate(post.published_at, locale)}
        </p>
      )}

      {post.cover_image_url && (
        <div className="relative mt-10 aspect-video w-full overflow-hidden rounded-2xl bg-royal/5">
          <Image
            src={post.cover_image_url}
            alt={localized.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <article className="prose prose-slate mt-10 max-w-none">
        <ReactMarkdown>{localized.content}</ReactMarkdown>
      </article>
    </Section>
  );
}
