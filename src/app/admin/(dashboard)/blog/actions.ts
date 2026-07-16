"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { uploadToBucket } from "@/lib/supabase/upload";
import type { ContentStatus } from "@/lib/types";

function parseTags(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function fromForm(formData: FormData) {
  const status = String(formData.get("status") ?? "draft") as ContentStatus;
  const existingPublishedAt = String(formData.get("existing_published_at") ?? "") || null;
  return {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    excerpt: String(formData.get("excerpt") ?? "") || null,
    content: String(formData.get("content") ?? ""),
    tags: parseTags(formData.get("tags")),
    status,
    published_at:
      status === "published" ? existingPublishedAt ?? new Date().toISOString() : null,
  };
}

export async function createBlogPost(formData: FormData) {
  const supabase = await createClient();
  const values = fromForm(formData);

  const coverFile = formData.get("cover_image") as File | null;
  const cover_image_url = coverFile
    ? await uploadToBucket(supabase, "blog-images", coverFile)
    : null;

  const { error } = await supabase.from("blog_posts").insert({
    ...values,
    cover_image_url,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/blog");
  revalidatePath("/[locale]/blog", "page");
  redirect("/admin/blog");
}

export async function updateBlogPost(id: string, formData: FormData) {
  const supabase = await createClient();
  const values = fromForm(formData);

  const coverFile = formData.get("cover_image") as File | null;
  const cover_image_url = coverFile && coverFile.size > 0
    ? await uploadToBucket(supabase, "blog-images", coverFile)
    : undefined;

  const { error } = await supabase
    .from("blog_posts")
    .update({
      ...values,
      ...(cover_image_url ? { cover_image_url } : {}),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/blog");
  revalidatePath("/[locale]/blog", "page");
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient();
  await supabase.from("blog_posts").delete().eq("id", id);
  revalidatePath("/admin/blog");
}
