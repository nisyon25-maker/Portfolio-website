import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const metadata = { title: "Overview" };

async function count(supabase: Awaited<ReturnType<typeof createClient>>, table: string) {
  const { count } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });
  return count ?? 0;
}

export default async function AdminOverviewPage() {
  const supabase = await createClient();
  const [services, projects, posts, newMessages] = await Promise.all([
    count(supabase, "services"),
    count(supabase, "projects"),
    count(supabase, "blog_posts"),
    supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .eq("status", "new")
      .then((r) => r.count ?? 0),
  ]);

  const stats = [
    { label: "Services", value: services, href: "/admin/services" },
    { label: "Projects", value: projects, href: "/admin/projects" },
    { label: "Blog posts", value: posts, href: "/admin/blog" },
    { label: "New messages", value: newMessages, href: "/admin/messages" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">Overview</h1>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-ink/10 bg-white p-5 transition hover:border-royal-bright/20"
          >
            <p className="text-3xl font-bold text-ink">{stat.value}</p>
            <p className="mt-1 text-sm text-ink/60">{stat.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
