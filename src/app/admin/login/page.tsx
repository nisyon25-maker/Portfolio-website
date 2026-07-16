import LoginForm from "./login-form";
import { isSupabaseConfigured } from "@/lib/env";
import SupabaseSetupNotice from "@/components/admin/supabase-setup-notice";

export const metadata = { title: "Sign in" };

export default function AdminLoginPage() {
  if (!isSupabaseConfigured) {
    return <SupabaseSetupNotice />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-royal px-6 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-cream/15 bg-cream p-8 shadow-xl shadow-royal/10">
        <h1 className="text-xl font-semibold text-royal">Admin sign in</h1>
        <p className="mt-1 text-sm text-royal/70">
          Sign in to manage your portfolio content.
        </p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
