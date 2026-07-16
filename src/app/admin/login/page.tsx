import LoginForm from "./login-form";
import { isSupabaseConfigured } from "@/lib/env";
import SupabaseSetupNotice from "@/components/admin/supabase-setup-notice";

export const metadata = { title: "Sign in" };

export default function AdminLoginPage() {
  if (!isSupabaseConfigured) {
    return <SupabaseSetupNotice />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-xl font-semibold">Admin sign in</h1>
        <p className="mt-1 text-sm text-slate-500">
          Sign in to manage your portfolio content.
        </p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
