"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { uploadToBucket } from "@/lib/supabase/upload";
import type { ContentStatus } from "@/lib/types";

function fromForm(formData: FormData) {
  return {
    name: String(formData.get("name") ?? ""),
    role: String(formData.get("role") ?? "") || null,
    company: String(formData.get("company") ?? "") || null,
    quote: String(formData.get("quote") ?? ""),
    status: String(formData.get("status") ?? "draft") as ContentStatus,
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
}

export async function createTestimonial(formData: FormData) {
  const supabase = await createClient();
  const values = fromForm(formData);
  const avatarFile = formData.get("avatar") as File | null;
  const avatar_url = avatarFile
    ? await uploadToBucket(supabase, "testimonial-avatars", avatarFile)
    : null;

  const { error } = await supabase.from("testimonials").insert({ ...values, avatar_url });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/testimonials");
  revalidatePath("/[locale]/testimonials", "page");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  const supabase = await createClient();
  const values = fromForm(formData);
  const avatarFile = formData.get("avatar") as File | null;
  const avatar_url = avatarFile && avatarFile.size > 0
    ? await uploadToBucket(supabase, "testimonial-avatars", avatarFile)
    : undefined;

  const { error } = await supabase
    .from("testimonials")
    .update({ ...values, ...(avatar_url ? { avatar_url } : {}) })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/testimonials");
  revalidatePath("/[locale]/testimonials", "page");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  await supabase.from("testimonials").delete().eq("id", id);
  revalidatePath("/admin/testimonials");
}
