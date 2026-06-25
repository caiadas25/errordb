import type { MetadataRoute } from "next";
import { errors } from "@/data/errors";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://errordb.vercel.app";
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...errors.map((e) => ({
      url: `${base}/error/${e.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
