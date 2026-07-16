import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteTestimonial } from "./actions";
import type { Testimonial } from "@/lib/types";

export const metadata = { title: "Testimonials" };

export default async function AdminTestimonialsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });
  const testimonials = (data ?? []) as Testimonial[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Testimonials</h1>
        <Link
          href="/admin/testimonials/new"
          className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white dark:bg-white dark:text-slate-900"
        >
          New testimonial
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 dark:bg-slate-900">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial) => (
              <tr key={testimonial.id} className="border-t border-slate-200 dark:border-slate-800">
                <td className="px-4 py-3 font-medium">{testimonial.name}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      testimonial.status === "published" ? "text-green-600" : "text-slate-400"
                    }
                  >
                    {testimonial.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/testimonials/${testimonial.id}`}
                    className="text-slate-600 hover:underline dark:text-slate-300"
                  >
                    Edit
                  </Link>
                  <form action={deleteTestimonial.bind(null, testimonial.id)} className="ml-4 inline">
                    <button type="submit" className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {testimonials.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-slate-400" colSpan={3}>
                  No testimonials yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
