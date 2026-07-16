import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import {
  DEFAULT_CONTACT,
  DEFAULT_SOCIALS,
  DEFAULT_SEO,
  type ContactConfig,
  type SocialsConfig,
  type SeoConfig,
} from "@/lib/site-config";
import type {
  BlogPost,
  PricingPackage,
  Project,
  Service,
  ServiceCategory,
  Testimonial,
} from "@/lib/types";

export async function getPublishedProjects(category?: ServiceCategory) {
  if (!isSupabaseConfigured) return [] as Project[];
  const supabase = await createClient();
  let query = supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (category) query = query.eq("category", category);

  const { data } = await query;
  return (data ?? []) as Project[];
}

export async function getFeaturedProjects(limit = 3) {
  const projects = await getPublishedProjects();
  return projects.slice(0, limit);
}

export async function getProjectBySlug(slug: string) {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  return data as Project | null;
}

export async function getPublishedBlogPosts() {
  if (!isSupabaseConfigured) return [] as BlogPost[];
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  return (data ?? []) as BlogPost[];
}

export async function getBlogPostBySlug(slug: string) {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  return data as BlogPost | null;
}

export async function getPublishedTestimonials() {
  if (!isSupabaseConfigured) return [] as Testimonial[];
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });
  return (data ?? []) as Testimonial[];
}

export async function getPublishedPricingPackages() {
  if (!isSupabaseConfigured) return [] as PricingPackage[];
  const supabase = await createClient();
  const { data } = await supabase
    .from("pricing_packages")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });
  return (data ?? []) as PricingPackage[];
}

export async function getSiteSetting(key: string) {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("*")
    .eq("key", key)
    .maybeSingle();
  return data?.value ?? null;
}

export async function getPublishedServices() {
  if (!isSupabaseConfigured) return [] as Service[];
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });
  return (data ?? []) as Service[];
}

/** Global SEO defaults, editable in the admin Settings page. Falls back to defaults. */
export async function getSiteSeo(): Promise<SeoConfig> {
  const stored = (await getSiteSetting("seo")) as Partial<SeoConfig> | null;
  return { ...DEFAULT_SEO, ...(stored ?? {}) };
}

/** Contact details, editable in the admin Settings page. Falls back to defaults. */
export async function getSiteContact(): Promise<ContactConfig> {
  const stored = (await getSiteSetting("contact")) as Partial<ContactConfig> | null;
  return { ...DEFAULT_CONTACT, ...(stored ?? {}) };
}

/** Social links, editable in the admin Settings page. Only non-empty links are kept. */
export async function getSiteSocials(): Promise<SocialsConfig> {
  const stored = (await getSiteSetting("socials")) as SocialsConfig | null;
  const merged: SocialsConfig = { ...DEFAULT_SOCIALS, ...(stored ?? {}) };
  return Object.fromEntries(
    Object.entries(merged).filter(([, url]) => typeof url === "string" && url.trim() !== "")
  );
}

/** Applies a per-locale translation override stored in the `translations` jsonb column. */
export function localize<T extends { translations?: Record<string, unknown> }>(
  entity: T,
  locale: string,
  fields: (keyof T)[]
): T {
  if (locale === "en" || !entity.translations?.[locale]) return entity;
  const overrides = entity.translations[locale] as Record<string, unknown>;
  const result = { ...entity };
  for (const field of fields) {
    if (overrides[field as string] !== undefined) {
      (result as Record<string, unknown>)[field as string] = overrides[field as string];
    }
  }
  return result;
}
