import { getSiteContact } from "@/lib/data";

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
  serviceInterest?: string | null;
};

function esc(value: string) {
  return value.replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!
  );
}

/**
 * Emails the site owner when a new contact submission arrives.
 *
 * Best-effort: if RESEND_API_KEY isn't set, this is a no-op, and any send
 * failure is swallowed so it never blocks the (already-saved) submission.
 * Configure with RESEND_API_KEY, optionally CONTACT_FROM_EMAIL and
 * CONTACT_NOTIFY_EMAIL (defaults to the site's contact email).
 */
export async function sendContactNotification(payload: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
  let to = process.env.CONTACT_NOTIFY_EMAIL;
  if (!to) {
    const contact = await getSiteContact();
    to = contact.email;
  }
  if (!to) return;

  const rows: [string, string][] = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Phone", payload.phone],
    ["Service interest", payload.serviceInterest || "—"],
  ];

  const html = `
    <div style="font-family:system-ui,Arial,sans-serif;max-width:560px;margin:auto">
      <h2 style="color:#1b2f7a">New contact inquiry</h2>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([k, v]) =>
              `<tr>
                 <td style="padding:6px 12px;color:#64748b;white-space:nowrap;vertical-align:top">${esc(k)}</td>
                 <td style="padding:6px 12px;color:#0f172a">${esc(v)}</td>
               </tr>`
          )
          .join("")}
      </table>
      <h3 style="color:#1b2f7a;margin-top:20px">Message</h3>
      <p style="white-space:pre-wrap;color:#0f172a;line-height:1.5">${esc(payload.message)}</p>
    </div>`;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: payload.email,
        subject: `New inquiry from ${payload.name}`,
        html,
      }),
    });
  } catch {
    // best-effort — the submission is already saved
  }
}
