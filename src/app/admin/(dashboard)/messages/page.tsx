import { createClient } from "@/lib/supabase/server";
import { markSubmissionStatus } from "./actions";
import type { ContactSubmission } from "@/lib/types";

export const metadata = { title: "Messages" };

const STATUS_STYLES: Record<ContactSubmission["status"], string> = {
  new: "text-royal-bright",
  read: "text-ink/50",
  responded: "text-green-600",
};

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });
  const submissions = (data ?? []) as ContactSubmission[];

  return (
    <div>
      <h1 className="text-2xl font-semibold">Messages</h1>

      <div className="mt-6 space-y-4">
        {submissions.map((submission) => (
          <div
            key={submission.id}
            className="rounded-xl border border-ink/10 bg-white p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-medium">{submission.name}</p>
                <a href={`mailto:${submission.email}`} className="text-sm text-royal-bright hover:underline">
                  {submission.email}
                </a>
                {submission.service_interest && (
                  <p className="mt-1 text-xs text-ink/50">
                    Interested in: {submission.service_interest}
                  </p>
                )}
              </div>
              <span className={`text-xs font-semibold uppercase ${STATUS_STYLES[submission.status]}`}>
                {submission.status}
              </span>
            </div>
            <p className="mt-4 whitespace-pre-wrap text-sm text-ink/70">
              {submission.message}
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs">
              <span className="text-ink/50">
                {new Date(submission.created_at).toLocaleString()}
              </span>
              {submission.status !== "read" && (
                <form action={markSubmissionStatus.bind(null, submission.id, "read")}>
                  <button type="submit" className="text-royal-bright hover:underline">
                    Mark as read
                  </button>
                </form>
              )}
              {submission.status !== "responded" && (
                <form action={markSubmissionStatus.bind(null, submission.id, "responded")}>
                  <button type="submit" className="text-green-600 hover:underline">
                    Mark as responded
                  </button>
                </form>
              )}
            </div>
          </div>
        ))}
        {submissions.length === 0 && (
          <p className="text-ink/50">No messages yet.</p>
        )}
      </div>
    </div>
  );
}
