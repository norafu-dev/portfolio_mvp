import {
  QueryDataSourceResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

import {
  type NotionRichText,
  type NotionSelectOption,
  NotionSelectColor,
} from "@/types/notion";

/**
 * type guard：过滤出完整的 Page 对象
 */
export const isFullPageObject = (
  result: QueryDataSourceResponse["results"][number]
): result is PageObjectResponse =>
  result.object === "page" && "properties" in result;

/**
 * 通用工具方法
 */
export const getPlainText = (items: NotionRichText[] = []) =>
  items
    .map((item) => item.plain_text)
    .join("")
    .trim();

export const getMultiSelectNames = (options: NotionSelectOption[] = []) =>
  options.map((option) => option.name ?? "").filter(Boolean);

export const toSelectOptions = (
  options: NonNullable<PageObjectResponse["properties"][string]> extends infer P
    ? P extends { type: "multi_select"; multi_select: infer O }
      ? O extends Array<infer Item>
        ? Item[]
        : never
      : never
    : never
): NotionSelectOption[] =>
  options.map((option) => ({
    id: option.id,
    name: option.name ?? "",
    color: option.color as NotionSelectColor,
  }));

/**
 * 将 Notion 官方 SDK 返回的临时文件链接转换为 Notion 的长期代理链接。
 * @param url         原始 file.url（可能是带签名的 S3 地址）
 * @param blockId     对应的页面或 block id（比如 page.id / block.id）
 * @param parentType  可选，Notion parent 类型，用于推导 table 参数
 *                    例如：'page_id' | 'database_id' | 'block_id' | 'workspace'
 */
export function buildNotionPermanentFileUrl(
  url: string | null | undefined,
  blockId: string,
  parentType?: "page_id" | "database_id" | "block_id" | "workspace" | "space_id"
): string | undefined {
  if (!url) return undefined;

  if (url.startsWith("data:")) return url;
  if (url.startsWith("https://images.unsplash.com")) return url;

  try {
    const parsed = new URL(url);

    const isSignedS3 =
      parsed.pathname.startsWith("/secure.notion-static.com") &&
      parsed.hostname.endsWith(".amazonaws.com") &&
      parsed.searchParams.has("X-Amz-Credential") &&
      parsed.searchParams.has("X-Amz-Signature") &&
      parsed.searchParams.has("X-Amz-Algorithm");

    if (isSignedS3) return url;
    if (parsed.hostname === "img.notionusercontent.com") return url;
  } catch {
    // 非法 URL 继续走 fallback 逻辑
  }

  if (url.startsWith("/images")) {
    url = `https://www.notion.so${url}`;
  }

  const base = url.startsWith("/image")
    ? `https://www.notion.so${url}`
    : `https://www.notion.so/image/${encodeURIComponent(url)}`;

  const notionImageUrl = new URL(base);

  // Notion /image 接口需要 table 参数
  // 官方 SDK 常见 parent.type 值：'page_id', 'database_id', 'block_id', 'workspace'
  // 其中 page/block 都映射为 'block'
  let table: string = "block";
  switch (parentType) {
    case "database_id":
      table = "collection";
      break;
    case "workspace":
    case "space_id":
      table = "space";
      break;
    default:
      table = "block";
  }

  notionImageUrl.searchParams.set("table", table);
  notionImageUrl.searchParams.set("id", blockId);
  notionImageUrl.searchParams.set("cache", "v2");

  return notionImageUrl.toString();
}

export const resolveCoverUrl = (page: PageObjectResponse): string | null => {
  if (!page.cover) return null;

  if (page.cover.type === "file") {
    return (
      buildNotionPermanentFileUrl(page.cover.file.url, page.id, "page_id") ??
      null
    );
  }

  if (page.cover.type === "external") {
    return page.cover.external.url;
  }

  return null;
};
