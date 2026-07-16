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
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white dark:bg-white dark:text-slate-900"
        >
          New project
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 dark:bg-slate-900">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t border-slate-200 dark:border-slate-800">
                <td className="px-4 py-3 font-medium">{project.title}</td>
                <td className="px-4 py-3 text-slate-500">{project.category}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      project.status === "published"
                        ? "text-green-600"
                        : "text-slate-400"
                    }
                  >
                    {project.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="text-slate-600 hover:underline dark:text-slate-300"
                  >
                    Edit
                  </Link>
                  <form
                    action={deleteProject.bind(null, project.id)}
                    className="ml-4 inline"
                  >
                    <button type="submit" className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-slate-400" colSpan={4}>
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
