import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BlogForm from "../blog-form";
import { updateBlogPost } from "../actions";
import type { BlogPost } from "@/lib/types";

export const metadata = { title: "Edit post" };

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle();
  const post = data as BlogPost | null;
  if (!post) notFound();

  const action = updateBlogPost.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Edit post</h1>
      <div className="mt-6">
        <BlogForm post={post} action={action} />
      </div>
    </div>
  );
}
