export type ContactConfig = {
  location: string;
  phone: string;
  whatsapp: string;
  email: string;
};

export type SocialsConfig = Record<string, string>;

export const DEFAULT_CONTACT: ContactConfig = {
  location: "Kathmandu, Nepal",
  phone: "+977-9705515425",
  whatsapp: "9779705515425",
  email: "lazyshane333@gmail.com",
};

export const DEFAULT_SOCIALS: SocialsConfig = {
  linkedin: "https://www.linkedin.com/in/nishanyonjan",
};

/** Platforms shown in the admin Settings social-links form (order matters). */
export const SOCIAL_PLATFORMS = [
  { key: "linkedin", label: "LinkedIn", placeholder: "https://www.linkedin.com/in/username" },
  { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/username" },
  { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/username" },
  { key: "twitter", label: "X (Twitter)", placeholder: "https://x.com/username" },
  { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/@channel" },
  { key: "tiktok", label: "TikTok", placeholder: "https://tiktok.com/@username" },
  { key: "github", label: "GitHub", placeholder: "https://github.com/username" },
  { key: "website", label: "Website", placeholder: "https://yoursite.com" },
] as const;

/** wa.me needs digits only (country code + number, no + or dashes). */
export function whatsappHref(whatsapp: string) {
  return `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`;
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}
