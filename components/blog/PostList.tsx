import type { NotionPageMeta } from "@/types/notion";
import PostCard from "./PostCard";

const PostList = ({ posts }: { posts: NotionPageMeta[] }) => {
  return (
    <ul>
      {posts.map((post) => {
        return <PostCard key={post.notionPageId} post={post} />;
      })}
    </ul>
  );
};

export default PostList;
