import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const notionX = new NotionAPI({
  activeUser: process.env.NOTION_ACTIVE_USER,
  authToken: process.env.NOTION_TOKEN_V2,
});

export { notion, notionX };
