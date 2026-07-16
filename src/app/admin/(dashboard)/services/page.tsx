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
        <h1 className="text-2xl font-semibold">Services</h1>
        <Link
          href="/admin/services/new"
          className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white dark:bg-white dark:text-slate-900"
        >
          New service
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 dark:bg-slate-900">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-t border-slate-200 dark:border-slate-800">
                <td className="px-4 py-3 font-medium">{service.title}</td>
                <td className="px-4 py-3">
                  <span className={service.status === "published" ? "text-green-600" : "text-slate-400"}>
                    {service.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/services/${service.id}`} className="text-slate-600 hover:underline dark:text-slate-300">
                    Edit
                  </Link>
                  <form action={deleteService.bind(null, service.id)} className="ml-4 inline">
                    <button type="submit" className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-slate-400" colSpan={3}>
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
