import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ServiceForm from "../service-form";
import { updateService } from "../actions";
import type { Service } from "@/lib/types";

export const metadata = { title: "Edit service" };

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("services").select("*").eq("id", id).maybeSingle();
  const service = data as Service | null;
  if (!service) notFound();

  const action = updateService.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Edit service</h1>
      <div className="mt-6">
        <ServiceForm service={service} action={action} />
      </div>
    </div>
  );
}
