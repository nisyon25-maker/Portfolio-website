import {
  Code2,
  Smartphone,
  Bot,
  Megaphone,
  Globe,
  Zap,
  PenTool,
  BarChart3,
  ShoppingCart,
  Search,
  Sparkles,
  Palette,
  type LucideIcon,
} from "lucide-react";

export const SERVICE_ICON_OPTIONS: { key: string; icon: LucideIcon }[] = [
  { key: "code", icon: Code2 },
  { key: "smartphone", icon: Smartphone },
  { key: "bot", icon: Bot },
  { key: "megaphone", icon: Megaphone },
  { key: "globe", icon: Globe },
  { key: "zap", icon: Zap },
  { key: "pen", icon: PenTool },
  { key: "chart", icon: BarChart3 },
  { key: "cart", icon: ShoppingCart },
  { key: "search", icon: Search },
  { key: "palette", icon: Palette },
  { key: "sparkles", icon: Sparkles },
];

export const SERVICE_ICON_MAP: Record<string, LucideIcon> = Object.fromEntries(
  SERVICE_ICON_OPTIONS.map((o) => [o.key, o.icon])
);

export function serviceIcon(key: string): LucideIcon {
  return SERVICE_ICON_MAP[key] ?? Sparkles;
}
