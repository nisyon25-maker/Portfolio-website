import { Field, Input, Textarea, Select } from "@/components/admin/form-fields";
import { categoryToCamel } from "@/lib/services-content";
import type { Project } from "@/lib/types";

export default function ProjectForm({
  project,
  action,
}: {
  project?: Project;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-6">
      <Field label="Title" htmlFor="title">
        <Input id="title" name="title" required defaultValue={project?.title} />
      </Field>

      <Field label="Slug" htmlFor="slug" hint="Used in the URL, e.g. my-project-name">
        <Input id="slug" name="slug" required defaultValue={project?.slug} />
      </Field>

      <Field label="Category" htmlFor="category" hint="Write the category yourself, e.g. web development or AI automation">
        <Input id="category" name="category" placeholder="e.g. Web Development" defaultValue={project?.category ? categoryToCamel(project.category) : ""} />
      </Field>

      <Field label="Description / Summary" htmlFor="summary" hint="Short description shown on cards and at the top of the case study.">
        <Textarea id="summary" name="summary" rows={3} defaultValue={project?.summary ?? ""} />
      </Field>

      <Field label="Project URL" htmlFor="project_url" hint="Live link to the project (optional), e.g. https://example.com">
        <Input id="project_url" name="project_url" type="url" placeholder="https://" defaultValue={project?.project_url ?? ""} />
      </Field>

      <Field label="Problem" htmlFor="problem">
        <Textarea id="problem" name="problem" rows={3} defaultValue={project?.problem ?? ""} />
      </Field>

      <Field label="Solution" htmlFor="solution">
        <Textarea id="solution" name="solution" rows={3} defaultValue={project?.solution ?? ""} />
      </Field>

      <Field label="Outcome" htmlFor="outcome">
        <Textarea id="outcome" name="outcome" rows={3} defaultValue={project?.outcome ?? ""} />
      </Field>

      <Field label="Tech stack" htmlFor="tech_stack" hint="Comma-separated, e.g. Next.js, Supabase, Tailwind">
        <Input id="tech_stack" name="tech_stack" defaultValue={project?.tech_stack?.join(", ")} />
      </Field>

      <Field label="Project image" htmlFor="cover_image" hint="Optional. If omitted, the project card/detail view will use the project URL preview when available.">
        <input id="cover_image" name="cover_image" type="file" accept="image/*" className="mt-2 block text-sm" />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Status" htmlFor="status">
          <Select id="status" name="status" defaultValue={project?.status ?? "draft"}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </Select>
        </Field>
        <Field label="Sort order" htmlFor="sort_order">
          <Input id="sort_order" name="sort_order" type="number" defaultValue={project?.sort_order ?? 0} />
        </Field>
      </div>

      <button
        type="submit"
        className="rounded-full bg-royal-bright px-6 py-3 text-sm font-medium text-cream transition hover:bg-royal-bright/90"
      >
        Save project
      </button>
    </form>
  );
}
