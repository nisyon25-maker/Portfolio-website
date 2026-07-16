import TestimonialForm from "../testimonial-form";
import { createTestimonial } from "../actions";

export const metadata = { title: "New testimonial" };

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">New testimonial</h1>
      <div className="mt-6">
        <TestimonialForm action={createTestimonial} />
      </div>
    </div>
  );
}
