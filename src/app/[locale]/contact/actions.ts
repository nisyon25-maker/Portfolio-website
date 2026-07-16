"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import type { ServiceCategory } from "@/lib/types";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  message: z.string().trim().min(1).max(5000),
  serviceInterest: z
    .enum([
      "web_development",
      "mobile_app_development",
      "ai_business_automation",
      "digital_marketing",
    ])
    .optional()
    .or(z.literal("")),
});

export type ContactFormState = {
  status: "idle" | "success" | "error";
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    serviceInterest: formData.get("serviceInterest"),
  });

  if (!parsed.success) {
    return { status: "error" };
  }

  if (!isSupabaseConfigured) {
    return { status: "error" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message,
    service_interest: (parsed.data.serviceInterest || null) as ServiceCategory | null,
  });

  if (error) {
    return { status: "error" };
  }

  return { status: "success" };
}
