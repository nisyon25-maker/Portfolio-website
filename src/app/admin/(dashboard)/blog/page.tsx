import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteBlogPost } from "./actions";
import type { BlogPost } from "@/lib/types";

export const metadata = { title: "Blog" };

export default async function AdminBlogPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });
  const posts = (data ?? []) as BlogPost[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-ink">Blog</h1>
        <Link
          href="/admin/blog/new"
          className="rounded-full bg-royal-bright px-5 py-2 text-sm font-medium text-cream transition hover:bg-royal-bright/90"
        >
          New post
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-ink/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream text-ink/60">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-ink/10">
                <td className="px-4 py-3 font-medium text-ink">{post.title}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      post.status === "published" ? "text-royal-bright" : "text-ink/50"
                    }
                  >
                    {post.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/blog/${post.id}`}
                    className="text-royal-bright hover:underline"
                  >
                    Edit
                  </Link>
                  <form action={deleteBlogPost.bind(null, post.id)} className="ml-4 inline">
                    <button type="submit" className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-ink/50" colSpan={3}>
                  No blog posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
