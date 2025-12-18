import { cache } from "react";
import getPageProperties from "@/lib/notion/getPageProperties";
import siteConfig from "@/site.config";
import { cacheLife, cacheTag } from "next/cache";

const fetchNotionPages = async () => {
  "use cache"; // 告诉 Next 这是 Data Cache 资源
  cacheLife("blog"); // 你已有的设置，决定缓存多久
  cacheTag("notion-pages");

  const posts = await getPageProperties(siteConfig.notion.dataSourceId);
  return posts;
};

// 所有派生函数都基于 cache 后的结果
export const getPosts = fetchNotionPages;

export const getAllTags = cache(async () => {
  const posts = await fetchNotionPages();
  return Array.from(new Set(posts.flatMap((p) => p.tags))).sort();
});

export const getAllCategories = cache(async () => {
  const posts = await fetchNotionPages();
  return Array.from(new Set(posts.map((p) => p.category).filter(Boolean)));
});

export const getPageIdBySlug = cache(async (slug: string) => {
  const posts = await fetchNotionPages();
  return posts.find((p) => p.slug === slug)?.notionPageId ?? null;
});
