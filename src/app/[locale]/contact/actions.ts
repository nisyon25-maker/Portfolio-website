"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { sendContactNotification } from "@/lib/email";
import type { ServiceCategory } from "@/lib/types";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(200, "Name is too long."),
  email: z.string().trim().email("Please enter a valid email address.").max(320, "Email is too long."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(20, "Please enter a valid phone number.")
    .regex(/^[+()0-9\s-]{7,20}$/, "Please enter a valid phone number."),
  message: z.string().trim().min(1, "Please enter your message.").max(5000, "Message is too long."),
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
  errors?: Partial<Record<"name" | "email" | "phone" | "message" | "serviceInterest" | "form", string>>;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
    serviceInterest: formData.get("serviceInterest"),
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      status: "error",
      errors: {
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        phone: fieldErrors.phone?.[0],
        message: fieldErrors.message?.[0],
        serviceInterest: fieldErrors.serviceInterest?.[0],
      },
    };
  }

  if (!isSupabaseConfigured) {
    return { status: "error", errors: { form: "Supabase is not configured." } };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    message: parsed.data.message,
    service_interest: (parsed.data.serviceInterest || null) as ServiceCategory | null,
  });

  if (error) {
    // Surface the real Postgres error in server logs (e.g. Vercel function logs)
    // — the most common cause is a missing `phone` column on the live database.
    console.error("[contact] insert failed:", error.message, error.details, error.hint);
    return { status: "error", errors: { form: "Unable to save your message right now." } };
  }

  // Best-effort owner notification; never blocks the submission.
  await sendContactNotification({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    message: parsed.data.message,
    serviceInterest: parsed.data.serviceInterest || null,
  });

  return { status: "success" };
}
