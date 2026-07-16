"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { uploadToBucket } from "@/lib/supabase/upload";
import type { ContentStatus, ServiceCategory } from "@/lib/types";

function parseTags(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function fromForm(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    category: String(formData.get("category") ?? "web_development") as ServiceCategory,
    summary: String(formData.get("summary") ?? "") || null,
    problem: String(formData.get("problem") ?? "") || null,
    solution: String(formData.get("solution") ?? "") || null,
    outcome: String(formData.get("outcome") ?? "") || null,
    tech_stack: parseTags(formData.get("tech_stack")),
    status: String(formData.get("status") ?? "draft") as ContentStatus,
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
}

export async function createProject(formData: FormData) {
  const supabase = await createClient();
  const values = fromForm(formData);

  const coverFile = formData.get("cover_image") as File | null;
  const cover_image_url = coverFile
    ? await uploadToBucket(supabase, "project-images", coverFile)
    : null;

  const { error } = await supabase.from("projects").insert({
    ...values,
    cover_image_url,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/projects");
  revalidatePath("/[locale]/projects", "page");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient();
  const values = fromForm(formData);

  const coverFile = formData.get("cover_image") as File | null;
  const cover_image_url = coverFile && coverFile.size > 0
    ? await uploadToBucket(supabase, "project-images", coverFile)
    : undefined;

  const { error } = await supabase
    .from("projects")
    .update({
      ...values,
      ...(cover_image_url ? { cover_image_url } : {}),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/projects");
  revalidatePath("/[locale]/projects", "page");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/admin/projects");
}
