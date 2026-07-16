import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import TestimonialForm from "../testimonial-form";
import { updateTestimonial } from "../actions";
import type { Testimonial } from "@/lib/types";

export const metadata = { title: "Edit testimonial" };

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("testimonials").select("*").eq("id", id).maybeSingle();
  const testimonial = data as Testimonial | null;
  if (!testimonial) notFound();

  const action = updateTestimonial.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Edit testimonial</h1>
      <div className="mt-6">
        <TestimonialForm testimonial={testimonial} action={action} />
      </div>
    </div>
  );
}
