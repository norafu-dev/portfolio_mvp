import { cacheLife, cacheTag } from "next/cache";
import getPageProperties from "@/lib/notion/getPageProperties";
import siteConfig from "@/site.config";
import { notionX } from "@/lib/notion/notion";

export const getPosts = async () => {
  "use cache";
  cacheLife("blog");
  cacheTag("notion-pages");
  const posts = await getPageProperties(siteConfig.notion.dataSourceId);
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

export const getPostBySlug = async (slug: string) => {
  const posts = await getPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    return null;
  }
  return post;
};

export const getPostRecordMap = async (pageId: string) => {
  "use cache";
  cacheLife("blog");
  cacheTag("notion-pages");
  const recordMap = await notionX.getPage(pageId);
  return recordMap;
};
