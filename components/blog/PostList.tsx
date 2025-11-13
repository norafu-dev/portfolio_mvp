import { Suspense } from "react";
import type { Post } from "@/lib/generated/prisma/client";
import Link from "next/link";

const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ul>
        {posts.map((post) => {
          const { id, slug, title, publishedAt, editedAt } = post;
          return (
            <li key={id}>
              <Link href={`/blog/${slug}`}>{title}</Link>
              <p>{publishedAt?.toISOString()}</p>
              <div>{editedAt?.toISOString()}</div>
            </li>
          );
        })}
      </ul>
    </Suspense>
  );
};

export default PostList;
