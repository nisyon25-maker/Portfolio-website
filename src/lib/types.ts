export type ServiceCategory =
  | "web_development"
  | "mobile_app_development"
  | "ai_business_automation"
  | "digital_marketing";

export type ContentStatus = "draft" | "published";

export interface Translations {
  [locale: string]: Record<string, string> | undefined;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ServiceCategory;
  summary: string | null;
  problem: string | null;
  solution: string | null;
  outcome: string | null;
  tech_stack: string[];
  cover_image_url: string | null;
  gallery_urls: string[];
  translations: Translations;
  status: ContentStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  tags: string[];
  translations: Translations;
  status: ContentStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  quote: string;
  avatar_url: string | null;
  translations: Translations;
  status: ContentStatus;
  sort_order: number;
  created_at: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  description: string | null;
  price_label: string;
  engagement_model: string | null;
  features: string[];
  translations: Translations;
  status: ContentStatus;
  sort_order: number;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  service_interest: ServiceCategory | null;
  status: "new" | "read" | "responded";
  created_at: string;
}

export interface SiteSetting {
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
}

export const SERVICE_CATEGORIES: { value: ServiceCategory; labelKey: string }[] = [
  { value: "web_development", labelKey: "webDevelopment" },
  { value: "mobile_app_development", labelKey: "mobileAppDevelopment" },
  { value: "ai_business_automation", labelKey: "aiBusinessAutomation" },
  { value: "digital_marketing", labelKey: "digitalMarketing" },
];
