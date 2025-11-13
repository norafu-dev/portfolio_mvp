export type Post = {
  id: string;
  notionPageId: string;
  slug: string;
  title: string;
  cover: string | null;
  views: number;
  publishedAt: string | null;
  editedAt: string | null;
};
