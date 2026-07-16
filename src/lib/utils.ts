import { clsx, type ClassValue } from "clsx";
import type { Project } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getProjectCoverImage(project: Project) {
  if (project.cover_image_url) {
    return project.cover_image_url;
  }

  if (!project.project_url) {
    return null;
  }

  return `https://image.thum.io/get/width/1200/crop/1200/${project.project_url}`;
}
