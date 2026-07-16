"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function markSubmissionStatus(
  id: string,
  status: "new" | "read" | "responded"
) {
  const supabase = await createClient();
  await supabase.from("contact_submissions").update({ status }).eq("id", id);
  revalidatePath("/admin/messages");
}
