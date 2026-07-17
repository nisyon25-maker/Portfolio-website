# Nishan Yonjan — Portfolio Website

Next.js (App Router) + TypeScript + Tailwind CSS + Supabase portfolio and admin CMS, covering four service areas (Web Development, Mobile App Development, AI Business Automation, Digital Marketing) with multi-language support (English + Nepali).

## Stack

- **Framework:** Next.js 16 (App Router), TypeScript (strict)
- **Styling:** Tailwind CSS v4 + `@tailwindcss/typography` for blog content
- **Database / Auth / Storage:** Supabase (Postgres, Auth, Storage, RLS)
- **i18n:** `next-intl` — locale-prefixed routing (`/` = English, `/ne` = Nepali)
- **Forms:** native Server Actions + `zod` validation

## Getting started

1. Install dependencies:
   ```
   npm install
   ```
2. Create a Supabase project at [supabase.com](https://supabase.com).
3. Copy `.env.example` to `.env.local` and fill in your Supabase URL and anon key (Project Settings → API).
4. Run `supabase/schema.sql` in the Supabase SQL editor (or `supabase db push` if using the CLI). This creates all tables, RLS policies, storage buckets, and default contact/socials settings. (If you set the database up before the admin-features update, run `supabase/migration-admin-features.sql` instead — it adds the new columns and the `services` table without touching existing data.)
5. **Create your admin login:** Supabase dashboard → Authentication → Users → **Add user**, and enter the email + password you want to sign in with (e.g. `admin@gmail.com` / your chosen password). Tick "Auto Confirm User". This is the only account with write access — there is no public sign-up, and the login only accepts credentials that exist here. The password lives in Supabase's auth system, never in the code.
6. Run the dev server:
   ```
   npm run dev
   ```
7. Visit `http://localhost:3000` for the public site and `http://localhost:3000/admin/login` to sign in to the dashboard.

## Deployment (Vercel)

1. Push this repo to GitHub/GitLab and import it into Vercel.
2. Add the environment variables from `.env.example` in the Vercel project settings (set `NEXT_PUBLIC_SITE_URL` to your production domain).
3. Deploy. Vercel will run `next build` automatically.

## Content management (for the site owner)

Everything below is done from `/admin` after signing in — no code changes or redeploys required.

- **Manage services:** Admin → Services → New service. Give it a title, description, an icon, and an optional link. Published services replace the four built-in ones on the public Services page; if you add none, the site shows the four defaults.
- **Add a project / case study:** Admin → Projects → New project. Fill in title, slug, category, description, a **live project URL** (shown as a "Visit project" button), problem/solution/outcome, tech stack, and a cover image. Set status to "Published" to make it live.
- **Write a blog post:** Admin → Blog → New post. Content supports Markdown. Each post has an **SEO** section (meta title + description) that controls its search/social preview — leave blank to use the title and excerpt. Draft posts are never shown publicly.
- **Add a testimonial:** Admin → Testimonials → New testimonial.
- **Read contact form submissions:** Admin → Messages. Every message sent through the site's contact form lands here; mark as read/responded as you work through them.
- **Site-wide SEO:** Admin → Settings → SEO. Set the default title, meta description, keywords, and social-preview image for the whole site.
- **Edit contact details:** Admin → Settings → Contact details. Update location, phone, WhatsApp number, and email — changes appear in the hero and footer across the whole site.
- **Manage social media links:** Admin → Settings → Social media links. Paste the full URL for LinkedIn, Instagram, Facebook, X, YouTube, TikTok, GitHub, or your website. Any field left blank is hidden from the site; the matching icon shows automatically for the ones you fill in.
- **Replace your resume/CV:** Admin → Settings → upload a new PDF; it immediately replaces the download link on the About page.
- **Reordering:** Projects and testimonials have a "Sort order" field — lower numbers appear first.

### Email notifications for new inquiries (optional)

Contact submissions always save to the database and show under Admin → Messages. To also get an **email each time someone submits the form**, set these environment variables (via [Resend](https://resend.com), free tier available):

- `RESEND_API_KEY` — your Resend API key (leave blank to disable notifications)
- `CONTACT_FROM_EMAIL` — the from address (must be a Resend-verified domain in production; `onboarding@resend.dev` works for testing)
- `CONTACT_NOTIFY_EMAIL` — where notifications are sent (defaults to your site contact email)

It's best-effort: if sending fails or no key is set, the submission is still saved — the visitor never sees an error.

Contact details and social links are stored in Supabase (the `site_settings` table) and read live by the site — no code changes or redeploys needed. Until you set them in the dashboard, the site falls back to sensible defaults defined in `src/lib/site-config.ts`.

### Translating content

Static UI text (navigation, buttons, labels) lives in `messages/en.json` and `messages/ne.json` and requires a code change to edit.

CMS content (projects, blog posts, testimonials) supports per-locale overrides via the `translations` jsonb column on each table, e.g.:
```json
{ "ne": { "title": "...", "summary": "..." } }
```
This is not yet exposed in the admin UI forms (English-only editing for now) — the fastest way to add a Nepali override today is via the Supabase Table Editor, editing the `translations` column directly on the relevant row. Wiring a language tab into the admin forms is the natural next enhancement here.

### Adding a new language

1. Add the locale code to `src/i18n/routing.ts` (`locales` array).
2. Create `messages/<locale>.json` (copy `messages/en.json` as a starting point and translate).
3. The language switcher in the navbar picks up new locales automatically.

## Project structure

```
src/
  app/
    [locale]/          public site (locale-prefixed: / and /ne)
    admin/              admin dashboard (English-only, auth-protected)
    sitemap.ts, robots.ts
  components/
    layout/             navbar, footer, language switcher
    home/, projects/, admin/, ui/
  lib/
    supabase/           browser + server Supabase clients, storage upload helper
    data.ts             public-facing data fetching (published content only)
    types.ts             shared TypeScript types + Supabase Database type
  i18n/                 next-intl routing/config
messages/                en.json, ne.json translation files
supabase/
  schema.sql             full schema, RLS policies, storage buckets, seed data
```

## Security notes

- Row-Level Security is enabled on every table. Public (anon) requests can only `select` rows with `status = 'published'`; all writes require an authenticated Supabase session.
- The `/admin/*` routes check for a valid Supabase session server-side on every request and redirect to `/admin/login` if absent.
- No service-role key is used anywhere in this codebase — all admin writes go through the authenticated user's own RLS-scoped session, so the anon key is safe to expose client-side (as intended by Supabase).
