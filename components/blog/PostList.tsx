import { Suspense } from "react";
import type { NotionPageMeta } from "@/types/notion";
import Link from "next/link";

const PostList = ({ posts }: { posts: NotionPageMeta[] }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ul>
        {posts.map((post) => {
          const { notionPageId, slug, title, publishedAt, editedAt } = post;
          return (
            <li key={notionPageId}>
              <Link href={`/blog/${slug}`}>{title}</Link>
              <p>{publishedAt}</p>
              <div>{editedAt}</div>
            </li>
          );
        })}
      </ul>
    </Suspense>
  );
};

export default PostList;
