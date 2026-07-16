"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ContentStatus } from "@/lib/types";

function fromForm(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    description: String(formData.get("description") ?? "") || null,
    icon_key: String(formData.get("icon_key") ?? "sparkles"),
    link_url: String(formData.get("link_url") ?? "") || null,
    status: String(formData.get("status") ?? "draft") as ContentStatus,
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
}

function revalidateServices() {
  revalidatePath("/admin/services");
  revalidatePath("/[locale]/services", "page");
}

export async function createService(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("services").insert(fromForm(formData));
  if (error) throw new Error(error.message);

  revalidateServices();
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("services")
    .update(fromForm(formData))
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidateServices();
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  const supabase = await createClient();
  await supabase.from("services").delete().eq("id", id);
  revalidateServices();
}
