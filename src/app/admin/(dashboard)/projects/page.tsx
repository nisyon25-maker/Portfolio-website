import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteProject } from "./actions";
import type { Project } from "@/lib/types";

export const metadata = { title: "Projects" };

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });
  const projects = (data ?? []) as Project[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-royal">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-full bg-royal-bright px-5 py-2 text-sm font-medium text-cream transition hover:bg-royal-bright/90"
        >
          New project
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-cream/20 bg-cream">
        <table className="w-full text-left text-sm">
          <thead className="bg-royal/5 text-royal/80">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t border-cream/20">
                <td className="px-4 py-3 font-medium text-royal">{project.title}</td>
                <td className="px-4 py-3 text-royal/60">{project.category}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      project.status === "published"
                        ? "text-royal-bright"
                        : "text-royal/50"
                    }
                  >
                    {project.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="text-royal-bright hover:underline"
                  >
                    Edit
                  </Link>
                  <form
                    action={deleteProject.bind(null, project.id)}
                    className="ml-4 inline"
                  >
                    <button type="submit" className="text-rose-600 hover:underline">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-royal/50" colSpan={4}>
                  No projects yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
