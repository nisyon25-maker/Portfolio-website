import BlogForm from "../blog-form";
import { createBlogPost } from "../actions";

export const metadata = { title: "New post" };

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">New post</h1>
      <div className="mt-6">
        <BlogForm action={createBlogPost} />
      </div>
    </div>
  );
}
