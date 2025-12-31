import { Suspense } from "react";
import { getPosts } from "@/lib/notion/data";
import PostList from "@/components/blog/PostList";
import PostListSkeleton from "@/components/blog/PostListSkeleton";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts
    .filter((post) => post.slug)
    .map((post) => ({
      slug: post.slug!,
    }));
}

const BlogPage = async () => {
  const posts = await getPosts();
  return (
    <section className="mt-16">
      <Suspense fallback={<PostListSkeleton />}>
        <PostList posts={posts} />
      </Suspense>
    </section>
  );
};

export default BlogPage;
