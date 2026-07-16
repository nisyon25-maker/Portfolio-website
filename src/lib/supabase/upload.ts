import type { SupabaseClient } from "@supabase/supabase-js";

export async function uploadToBucket(
  supabase: SupabaseClient,
  bucket: string,
  file: File
): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const ext = file.name.split(".").pop();
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) return null;

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);

  return publicUrl;
}
