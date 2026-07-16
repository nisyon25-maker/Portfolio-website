import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/container";
import { Card, Badge } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { getPublishedBlogPosts, localize } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return { title: t("title") };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const posts = await getPublishedBlogPosts();

  return (
    <Section>
      <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">{t("title")}</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink/70">
        {t("subtitle")}
      </p>

      {posts.length === 0 ? (
        <p className="mt-12 text-ink/60">{t("empty")}</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const localized = localize(post, locale, ["title", "excerpt"]);
            return (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="flex h-full flex-col overflow-hidden p-0">
                  <div className="relative aspect-video w-full bg-royal-bright/10">
                    {post.cover_image_url && (
                      <Image
                        src={post.cover_image_url}
                        alt={localized.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    {post.tags[0] && <Badge className="mb-3 w-fit">{post.tags[0]}</Badge>}
                    <h2 className="text-lg font-semibold">{localized.title}</h2>
                    {localized.excerpt && (
                      <p className="mt-2 line-clamp-3 text-sm text-ink/70">
                        {localized.excerpt}
                      </p>
                    )}
                    {post.published_at && (
                      <p className="mt-4 text-xs text-ink/50">
                        {formatDate(post.published_at, locale)}
                      </p>
                    )}
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </Section>
  );
}
