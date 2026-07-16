"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { uploadToBucket } from "@/lib/supabase/upload";
import { SOCIAL_PLATFORMS } from "@/lib/site-config";

/** Re-render everywhere contact/socials appear (hero, footer, about). */
function revalidateSite() {
  revalidatePath("/admin/settings");
  revalidatePath("/[locale]", "layout");
}

export async function uploadResume(formData: FormData) {
  const supabase = await createClient();
  const file = formData.get("resume") as File | null;
  if (!file || file.size === 0) return;

  const url = await uploadToBucket(supabase, "resume", file);
  if (!url) return;

  await supabase
    .from("site_settings")
    .upsert({ key: "resume", value: { url }, updated_at: new Date().toISOString() });

  revalidatePath("/admin/settings");
  revalidatePath("/[locale]/about", "page");
}

export async function saveContact(formData: FormData) {
  const supabase = await createClient();
  const value = {
    location: String(formData.get("location") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    whatsapp: String(formData.get("whatsapp") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
  };

  await supabase
    .from("site_settings")
    .upsert({ key: "contact", value, updated_at: new Date().toISOString() });

  revalidateSite();
}

export async function saveSeo(formData: FormData) {
  const supabase = await createClient();
  const value = {
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    keywords: String(formData.get("keywords") ?? "").trim(),
    ogImageUrl: String(formData.get("ogImageUrl") ?? "").trim(),
  };

  await supabase
    .from("site_settings")
    .upsert({ key: "seo", value, updated_at: new Date().toISOString() });

  revalidateSite();
}

export async function saveSocials(formData: FormData) {
  const supabase = await createClient();
  const value: Record<string, string> = {};
  for (const platform of SOCIAL_PLATFORMS) {
    const url = String(formData.get(platform.key) ?? "").trim();
    if (url) value[platform.key] = url;
  }

  await supabase
    .from("site_settings")
    .upsert({ key: "socials", value, updated_at: new Date().toISOString() });

  revalidateSite();
}
