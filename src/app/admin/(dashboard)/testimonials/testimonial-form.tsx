import { Field, Input, Textarea, Select } from "@/components/admin/form-fields";
import type { Testimonial } from "@/lib/types";

export default function TestimonialForm({
  testimonial,
  action,
}: {
  testimonial?: Testimonial;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="max-w-xl space-y-6">
      <Field label="Name" htmlFor="name">
        <Input id="name" name="name" required defaultValue={testimonial?.name} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Role" htmlFor="role">
          <Input id="role" name="role" defaultValue={testimonial?.role ?? ""} />
        </Field>
        <Field label="Company" htmlFor="company">
          <Input id="company" name="company" defaultValue={testimonial?.company ?? ""} />
        </Field>
      </div>
      <Field label="Quote" htmlFor="quote">
        <Textarea id="quote" name="quote" rows={4} required defaultValue={testimonial?.quote} />
      </Field>
      <Field label="Avatar" htmlFor="avatar">
        <input id="avatar" name="avatar" type="file" accept="image/*" className="mt-2 block text-sm" />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Status" htmlFor="status">
          <Select id="status" name="status" defaultValue={testimonial?.status ?? "draft"}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </Select>
        </Field>
        <Field label="Sort order" htmlFor="sort_order">
          <Input id="sort_order" name="sort_order" type="number" defaultValue={testimonial?.sort_order ?? 0} />
        </Field>
      </div>
      <button
        type="submit"
        className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white dark:bg-white dark:text-slate-900"
      >
        Save testimonial
      </button>
    </form>
  );
}
