import { Suspense } from "react";
import { getPosts } from "@/lib/notion/data";
import PostList from "@/components/blog/PostList";
import PostListSkeleton from "@/components/blog/PostListSkeleton";

const BlogPage = () => {
  return (
    <section className="mt-16">
      <Suspense fallback={<PostListSkeleton />}>
        <PostListWrapper />
      </Suspense>
    </section>
  );
};

const PostListWrapper = async () => {
  const posts = await getPosts();
  return <PostList posts={posts} />;
};

export default BlogPage;
