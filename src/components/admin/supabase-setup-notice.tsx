export default function SupabaseSetupNotice() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-royal px-6 py-16">
      <div className="max-w-md rounded-2xl border border-cream/15 bg-cream p-8 text-royal shadow-xl shadow-royal/10">
        <h1 className="text-lg font-semibold">Supabase isn&apos;t configured yet</h1>
        <p className="mt-3 text-sm leading-relaxed">
          Set <code className="rounded bg-royal/5 px-1 py-0.5 text-royal">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="rounded bg-royal/5 px-1 py-0.5 text-royal">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in{" "}
          <code className="rounded bg-royal/5 px-1 py-0.5 text-royal">.env.local</code>, run{" "}
          <code className="rounded bg-royal/5 px-1 py-0.5 text-royal">supabase/schema.sql</code> against your
          project, then restart the dev server. See the README for full setup steps.
        </p>
      </div>
    </div>
  );
}
