import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPublishedProjects, getPublishedBlogPosts } from "@/lib/data";

const STATIC_PATHS = [
  "",
  "/about",
  "/services",
  "/projects",
  "/blog",
  "/testimonials",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const [projects, posts] = await Promise.all([
    getPublishedProjects(),
    getPublishedBlogPosts(),
  ]);

  const dynamicPaths = [
    ...projects.map((p) => `/projects/${p.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ];

  const allPaths = [...STATIC_PATHS, ...dynamicPaths];

  return allPaths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}${locale === routing.defaultLocale ? "" : `/${locale}`}${path}`,
      lastModified: new Date(),
    }))
  );
}
