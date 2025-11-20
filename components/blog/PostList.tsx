import { Suspense } from "react";
import type { NotionPageMeta } from "@/types/notion";
import PostCard from "./PostCard";

const PostList = ({ posts }: { posts: NotionPageMeta[] }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ul>
        {posts.map((post) => {
          return <PostCard key={post.notionPageId} post={post} />;
        })}
      </ul>
    </Suspense>
  );
};

export default PostList;
