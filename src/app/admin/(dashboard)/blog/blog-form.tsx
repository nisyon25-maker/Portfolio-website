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

      <div className="rounded-lg border border-cream/20 bg-cream p-4">
        <p className="text-sm font-semibold text-royal">SEO</p>
        <p className="mt-1 text-xs text-ink/60">
          Controls the browser tab title and search/social preview. Leave blank to
          use the post title and excerpt.
        </p>
        <div className="mt-4 space-y-4">
          <Field label="Meta title" htmlFor="meta_title" hint="~60 characters recommended.">
            <Input id="meta_title" name="meta_title" defaultValue={post?.meta_title ?? ""} />
          </Field>
          <Field label="Meta description" htmlFor="meta_description" hint="~155 characters recommended.">
            <Textarea id="meta_description" name="meta_description" rows={2} defaultValue={post?.meta_description ?? ""} />
          </Field>
        </div>
      </div>

      <Field label="Status" htmlFor="status">
        <Select id="status" name="status" defaultValue={post?.status ?? "draft"}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </Select>
      </Field>

      <input type="hidden" name="existing_published_at" value={post?.published_at ?? ""} />

      <button
        type="submit"
        className="rounded-full bg-royal-bright px-6 py-3 text-sm font-medium text-cream transition hover:bg-royal-bright/90"
      >
        Save post
      </button>
    </form>
  );
}
