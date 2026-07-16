import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProjectForm from "../project-form";
import { updateProject } from "../actions";
import type { Project } from "@/lib/types";

export const metadata = { title: "Edit project" };

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
  const project = data as Project | null;
  if (!project) notFound();

  const action = updateProject.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Edit project</h1>
      <div className="mt-6">
        <ProjectForm project={project} action={action} />
      </div>
    </div>
  );
}
