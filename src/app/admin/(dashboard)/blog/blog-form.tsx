import { Field, Input, Textarea, Select } from "@/components/admin/form-fields";
import type { BlogPost } from "@/lib/types";

export default function BlogForm({
  post,
  action,
}: {
  post?: BlogPost;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-6">
      <Field label="Title" htmlFor="title">
        <Input id="title" name="title" required defaultValue={post?.title} />
      </Field>

      <Field label="Slug" htmlFor="slug" hint="Used in the URL, e.g. my-post-title">
        <Input id="slug" name="slug" required defaultValue={post?.slug} />
      </Field>

      <Field label="Excerpt" htmlFor="excerpt">
        <Textarea id="excerpt" name="excerpt" rows={2} defaultValue={post?.excerpt ?? ""} />
      </Field>

      <Field label="Content" htmlFor="content" hint="Markdown supported">
        <Textarea id="content" name="content" rows={14} required defaultValue={post?.content ?? ""} />
      </Field>

      <Field label="Tags" htmlFor="tags" hint="Comma-separated, e.g. AI, Automation">
        <Input id="tags" name="tags" defaultValue={post?.tags?.join(", ")} />
      </Field>

      <Field label="Cover image" htmlFor="cover_image" hint={post?.cover_image_url ? "Uploading a new file replaces the current image." : undefined}>
        <input id="cover_image" name="cover_image" type="file" accept="image/*" className="mt-2 block text-sm" />
      </Field>

      <Field label="Status" htmlFor="status">
        <Select id="status" name="status" defaultValue={post?.status ?? "draft"}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </Select>
      </Field>

      <input type="hidden" name="existing_published_at" value={post?.published_at ?? ""} />

      <button
        type="submit"
        className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white dark:bg-white dark:text-slate-900"
      >
        Save post
      </button>
    </form>
  );
}
