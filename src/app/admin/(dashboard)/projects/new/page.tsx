import ProjectForm from "../project-form";
import { createProject } from "../actions";

export const metadata = { title: "New project" };

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">New project</h1>
      <div className="mt-6">
        <ProjectForm action={createProject} />
      </div>
    </div>
  );
}
