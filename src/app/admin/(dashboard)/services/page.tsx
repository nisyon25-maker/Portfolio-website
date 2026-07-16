import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteService } from "./actions";
import type { Service } from "@/lib/types";

export const metadata = { title: "Services" };

export default async function AdminServicesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });
  const services = (data ?? []) as Service[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-ink">Services</h1>
        <Link
          href="/admin/services/new"
          className="rounded-full bg-royal-bright px-5 py-2 text-sm font-medium text-cream transition hover:bg-royal-bright/90"
        >
          New service
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-cream/20 bg-cream">
        <table className="w-full text-left text-sm">
          <thead className="bg-royal/5 text-royal/80">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-t border-cream/20">
                <td className="px-4 py-3 font-medium text-royal">{service.title}</td>
                <td className="px-4 py-3">
                  <span className={service.status === "published" ? "text-royal-bright" : "text-royal/50"}>
                    {service.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/services/${service.id}`} className="text-royal-bright hover:underline">
                    Edit
                  </Link>
                  <form action={deleteService.bind(null, service.id)} className="ml-4 inline">
                    <button type="submit" className="text-rose-600 hover:underline">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-royal/50" colSpan={3}>
                  No services yet. The public Services page falls back to the four default
                  disciplines until you add some here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
