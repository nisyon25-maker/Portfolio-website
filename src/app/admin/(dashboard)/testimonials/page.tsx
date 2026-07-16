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
        <h1 className="text-2xl font-semibold text-ink">Testimonials</h1>
        <Link
          href="/admin/testimonials/new"
          className="rounded-full bg-royal-bright px-5 py-2 text-sm font-medium text-cream transition hover:bg-royal-bright/90"
        >
          New testimonial
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-ink/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream text-ink/60">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial) => (
              <tr key={testimonial.id} className="border-t border-ink/10">
                <td className="px-4 py-3 font-medium text-ink">{testimonial.name}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      testimonial.status === "published" ? "text-royal-bright" : "text-ink/50"
                    }
                  >
                    {testimonial.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/testimonials/${testimonial.id}`}
                    className="text-royal-bright hover:underline"
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
                <td className="px-4 py-6 text-ink/50" colSpan={3}>
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
