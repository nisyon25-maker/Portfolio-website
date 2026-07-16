import { getSiteContact, getSiteSocials, getSiteSeo, getSiteSetting } from "@/lib/data";
import { SOCIAL_PLATFORMS } from "@/lib/site-config";
import { Field, Input, Textarea } from "@/components/admin/form-fields";
import { uploadResume, saveContact, saveSocials, saveSeo } from "./actions";

export const metadata = { title: "Settings" };

const cardClass =
  "max-w-2xl rounded-xl border border-ink/10 bg-white p-6";
const saveBtnClass =
  "rounded-full bg-royal-bright px-6 py-2.5 text-sm font-medium text-cream transition hover:bg-royal-bright/90";

export default async function AdminSettingsPage() {
  const [contact, socials, seo, resume] = await Promise.all([
    getSiteContact(),
    getSiteSocials(),
    getSiteSeo(),
    getSiteSetting("resume") as Promise<{ url?: string } | null>,
  ]);
  const resumeUrl = resume?.url;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Settings</h1>

      {/* SEO */}
      <section className={cardClass}>
        <h2 className="font-semibold">SEO</h2>
        <p className="mt-1 text-sm text-ink/60">
          Default title, description, and social preview for the whole site.
        </p>
        <form action={saveSeo} className="mt-5 space-y-5">
          <Field label="Site title" htmlFor="title">
            <Input id="title" name="title" defaultValue={seo.title} />
          </Field>
          <Field label="Meta description" htmlFor="description" hint="~155 characters recommended.">
            <Textarea id="description" name="description" rows={2} defaultValue={seo.description} />
          </Field>
          <Field label="Keywords" htmlFor="keywords" hint="Comma-separated.">
            <Input id="keywords" name="keywords" defaultValue={seo.keywords} />
          </Field>
          <Field label="Social preview image URL" htmlFor="ogImageUrl" hint="Used for link previews (Open Graph). Optional.">
            <Input id="ogImageUrl" name="ogImageUrl" type="url" placeholder="https://" defaultValue={seo.ogImageUrl} />
          </Field>
          <button type="submit" className={saveBtnClass}>
            Save SEO
          </button>
        </form>
      </section>

      {/* Contact details */}
      <section className={cardClass}>
        <h2 className="font-semibold">Contact details</h2>
        <p className="mt-1 text-sm text-ink/60">
          Shown in the hero and footer across the site.
        </p>
        <form action={saveContact} className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Location" htmlFor="location">
            <Input id="location" name="location" defaultValue={contact.location} />
          </Field>
          <Field label="Phone" htmlFor="phone" hint="Shown as a tap-to-call link.">
            <Input id="phone" name="phone" defaultValue={contact.phone} />
          </Field>
          <Field
            label="WhatsApp number"
            htmlFor="whatsapp"
            hint="Digits only, incl. country code (e.g. 9779705515425). Leave blank to hide."
          >
            <Input id="whatsapp" name="whatsapp" defaultValue={contact.whatsapp} />
          </Field>
          <Field label="Email" htmlFor="email">
            <Input id="email" name="email" type="email" defaultValue={contact.email} />
          </Field>
          <div className="sm:col-span-2">
            <button type="submit" className={saveBtnClass}>
              Save contact details
            </button>
          </div>
        </form>
      </section>

      {/* Social links */}
      <section className={cardClass}>
        <h2 className="font-semibold">Social media links</h2>
        <p className="mt-1 text-sm text-ink/60">
          Paste the full URL for each platform. Empty fields are hidden from the site.
        </p>
        <form action={saveSocials} className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {SOCIAL_PLATFORMS.map((platform) => (
            <Field key={platform.key} label={platform.label} htmlFor={platform.key}>
              <Input
                id={platform.key}
                name={platform.key}
                type="url"
                placeholder={platform.placeholder}
                defaultValue={socials[platform.key] ?? ""}
              />
            </Field>
          ))}
          <div className="sm:col-span-2">
            <button type="submit" className={saveBtnClass}>
              Save social links
            </button>
          </div>
        </form>
      </section>

      {/* Resume / CV */}
      <section className={cardClass}>
        <h2 className="font-semibold">Resume / CV</h2>
        <p className="mt-1 text-sm text-ink/60">
          Powers the download button on the About page.
        </p>

        {resumeUrl && (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-blue-600 hover:underline"
          >
            View current resume
          </a>
        )}

        <form action={uploadResume} className="mt-4 flex flex-wrap items-center gap-4">
          <input type="file" name="resume" accept="application/pdf" required className="text-sm" />
          <button type="submit" className={saveBtnClass}>
            Upload
          </button>
        </form>
      </section>
    </div>
  );
}
