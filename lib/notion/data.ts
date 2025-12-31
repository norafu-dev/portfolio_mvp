import getPageProperties from "@/lib/notion/getPageProperties";
import siteConfig from "@/site.config";
import { cacheLife, cacheTag } from "next/cache";

export const getPosts = async () => {
  "use cache";
  cacheLife("blog");
  cacheTag("notion-pages");
  const posts = await getPageProperties(siteConfig.notion.dataSourceId);
  console.log("fetchNotionPages", new Date().toISOString());
  return posts;
};

export const getAllTags = async () => {
  return Array.from(new Set((await getPosts()).flatMap((p) => p.tags))).sort();
};

export const getAllCategories = async () => {
  return Array.from(
    new Set((await getPosts()).map((p) => p.category).filter(Boolean))
  ).sort();
};

export const getPageIdBySlug = async (slug: string) => {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug)?.notionPageId ?? null;
};
