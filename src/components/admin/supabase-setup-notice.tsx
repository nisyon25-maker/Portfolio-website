export default function SupabaseSetupNotice() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md rounded-2xl border border-ink/10 bg-white p-8 text-ink">
        <h1 className="text-lg font-semibold">Supabase isn&apos;t configured yet</h1>
        <p className="mt-3 text-sm">
          Set <code className="rounded bg-black/10 px-1 py-0.5">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="rounded bg-black/10 px-1 py-0.5">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in{" "}
          <code className="rounded bg-black/10 px-1 py-0.5">.env.local</code>, run{" "}
          <code className="rounded bg-black/10 px-1 py-0.5">supabase/schema.sql</code> against your
          project, then restart the dev server. See the README for full setup steps.
        </p>
      </div>
    </div>
  );
}
