import { Code2, Smartphone, Bot, Megaphone } from "lucide-react";
import type { ServiceCategory } from "@/lib/types";

export const SERVICE_SLUGS: Record<ServiceCategory, string> = {
  web_development: "web-development",
  mobile_app_development: "mobile-app-development",
  ai_business_automation: "ai-business-automation",
  digital_marketing: "digital-marketing",
};

export const SLUG_TO_CATEGORY: Record<string, ServiceCategory> = Object.fromEntries(
  Object.entries(SERVICE_SLUGS).map(([category, slug]) => [slug, category])
) as Record<string, ServiceCategory>;

export const SERVICE_ICONS: Record<ServiceCategory, React.ElementType> = {
  web_development: Code2,
  mobile_app_development: Smartphone,
  ai_business_automation: Bot,
  digital_marketing: Megaphone,
};

export function categoryToCamel(category: ServiceCategory) {
  return category.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());
}

export const ALL_SERVICE_CATEGORIES: ServiceCategory[] = [
  "web_development",
  "mobile_app_development",
  "ai_business_automation",
  "digital_marketing",
];
