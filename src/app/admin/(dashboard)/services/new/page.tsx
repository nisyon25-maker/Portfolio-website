import ServiceForm from "../service-form";
import { createService } from "../actions";

export const metadata = { title: "New service" };

export default function NewServicePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">New service</h1>
      <div className="mt-6">
        <ServiceForm action={createService} />
      </div>
    </div>
  );
}
