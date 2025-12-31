import notion from "@/lib/notion/notion";
import getImage from "@/lib/getImage";

import type { QueryDataSourceResponse } from "@notionhq/client/build/src/api-endpoints";

import { type NotionPageMeta } from "@/types/notion";

import {
  resolveCoverUrl,
  toSelectOptions,
  getMultiSelectNames,
  getPlainText,
  isFullPageObject,
} from "./utils";

const retrieveDataSource = async (
  data_source_id: string
): Promise<QueryDataSourceResponse | null> => {
  // 查询数据源
  try {
    const response = await notion.dataSources.query({
      data_source_id,
      filter: {
        property: "Status",
        status: {
          equals: "Published",
        },
      },
    });
    // 如果还有更多数据，则继续查询
    while (response.has_more) {
      const nextResponse = await notion.dataSources.query({
        data_source_id,
        start_cursor: response.next_cursor ?? undefined,
      });
      response.results.push(...nextResponse.results);
      response.next_cursor = nextResponse.next_cursor;
    }
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getPageProperties = async (
  dataSourceId: string
): Promise<NotionPageMeta[]> => {
  const dataSource = await retrieveDataSource(dataSourceId);
  if (!dataSource) {
    return [];
  }

  const tasks = dataSource.results
    .filter(isFullPageObject)
    .map(async (page) => {
      const titleProp = page.properties["Title"];
      const slugProp = page.properties["Slug"];
      const categoryProp = page.properties["Category"];
      const tagsProp = page.properties["Tags"];
      const publishedAtProp = page.properties["PublishedAt"];
      const editedAtProp = page.properties["EditedAt"];

      const coverUrl = resolveCoverUrl(page);
      let blurDataURL = null;
      if (coverUrl) {
        const image = await getImage(coverUrl);
        blurDataURL = image?.base64 ?? null;
      }

      return {
        notionPageId: page.id,
        title:
          titleProp?.type === "title"
            ? getPlainText(titleProp.title) || "Untitled"
            : "Untitled",
        slug:
          slugProp?.type === "rich_text"
            ? getPlainText(slugProp.rich_text) || null
            : null,
        coverUrl,
        blurDataURL,
        category:
          categoryProp?.type === "select"
            ? categoryProp.select?.name ?? null
            : null,
        tags:
          tagsProp?.type === "multi_select"
            ? getMultiSelectNames(toSelectOptions(tagsProp.multi_select))
            : [],
        publishedAt:
          publishedAtProp?.type === "date"
            ? publishedAtProp.date?.start ?? null
            : null,
        editedAt:
          editedAtProp?.type === "date"
            ? editedAtProp.date?.start ?? null
            : null,
      };
    });

  return Promise.all(tasks);
};

export default getPageProperties;
