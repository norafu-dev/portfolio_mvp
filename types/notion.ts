import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export type NotionPageMeta = {
  notionPageId: string;
  title: string;
  slug: string | null;
  coverUrl: string | null;
  tags: string[];
  publishedAt: string | null;
  editedAt: string | null;
};

export type NotionRichText = RichTextItemResponse;

export type NotionSelectColor =
  | "default"
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red";

export type NotionFile =
  | {
      name: string;
      type: "file";
      file: {
        url: string;
        expiry_time: string;
      };
    }
  | {
      name: string;
      type: "external";
      external: {
        url: string;
      };
    };

export type NotionSelectOption = {
  id: string;
  name: string;
  color: NotionSelectColor;
};
