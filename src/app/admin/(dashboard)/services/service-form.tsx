import { Field, Input, Textarea, Select } from "@/components/admin/form-fields";
import { SERVICE_ICON_OPTIONS } from "@/lib/service-icons";
import type { Service } from "@/lib/types";

export default function ServiceForm({
  service,
  action,
}: {
  service?: Service;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-6">
      <Field label="Title" htmlFor="title">
        <Input id="title" name="title" required defaultValue={service?.title} />
      </Field>

      <Field label="Slug" htmlFor="slug" hint="Used in the URL, e.g. web-development">
        <Input id="slug" name="slug" required defaultValue={service?.slug} />
      </Field>

      <Field label="Description" htmlFor="description">
        <Textarea id="description" name="description" rows={4} defaultValue={service?.description ?? ""} />
      </Field>

      <Field label="Icon" htmlFor="icon_key">
        <Select id="icon_key" name="icon_key" defaultValue={service?.icon_key ?? "sparkles"}>
          {SERVICE_ICON_OPTIONS.map((opt) => (
            <option key={opt.key} value={opt.key}>
              {opt.key}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Link (optional)" htmlFor="link_url" hint="Where 'Learn more' points, e.g. a detail page or external URL.">
        <Input id="link_url" name="link_url" type="url" placeholder="https://" defaultValue={service?.link_url ?? ""} />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Status" htmlFor="status">
          <Select id="status" name="status" defaultValue={service?.status ?? "draft"}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </Select>
        </Field>
        <Field label="Sort order" htmlFor="sort_order">
          <Input id="sort_order" name="sort_order" type="number" defaultValue={service?.sort_order ?? 0} />
        </Field>
      </div>

      <button
        type="submit"
        className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white dark:bg-white dark:text-slate-900"
      >
        Save service
      </button>
    </form>
  );
}
