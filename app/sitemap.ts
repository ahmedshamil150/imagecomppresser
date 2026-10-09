"use cache";

import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

const staticRoutes: { path: string; priority: number; changeFrequency: string }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/compress-image", priority: 0.9, changeFrequency: "monthly" },
  { path: "/resize-image", priority: 0.9, changeFrequency: "monthly" },
  { path: "/bulk-image-compressor", priority: 0.8, changeFrequency: "monthly" },
  { path: "/png-to-jpg", priority: 0.8, changeFrequency: "monthly" },
  { path: "/jpg-to-webp", priority: 0.8, changeFrequency: "monthly" },
  { path: "/webp-to-jpg", priority: 0.8, changeFrequency: "monthly" },
  { path: "/png-to-webp", priority: 0.8, changeFrequency: "monthly" },
  { path: "/how-it-works", priority: 0.6, changeFrequency: "yearly" },
  { path: "/formats", priority: 0.6, changeFrequency: "yearly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/about", priority: 0.3, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: new Date(),
      changeFrequency: route.changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority: route.priority,
    })),
    ...posts,
  ];
}
