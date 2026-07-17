"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LoginState = { error?: string };

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error("[admin login] auth failed:", error.status, error.message);
    // Surface the real reason so setup issues (e.g. an unconfirmed user) are
    // actionable instead of a generic "invalid credentials".
    const reason =
      error.message === "Email not confirmed"
        ? "This account exists but its email isn't confirmed. In Supabase → Authentication → Users, confirm the user (or recreate it with “Auto Confirm User” ticked)."
        : error.message || "Invalid email or password.";
    return { error: reason };
  }

  redirect("/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
