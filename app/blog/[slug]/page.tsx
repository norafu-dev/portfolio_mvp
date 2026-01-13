import { getPostBySlug, getPosts } from "@/lib/notion/data";
import PostHead from "@/components/blog/post/PostHead";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PostViewsWrapper from "@/components/blog/post/PostViewsWrapper";
import { getPostRecordMap } from "@/lib/notion/data";
import NotionRenderer from "@/components/blog/post/NotionRenderer";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts
    .filter((post) => post.slug)
    .map((post) => ({
      slug: post.slug!,
    }));
}

const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  // 1. 获取静态文章内容（快速）
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const recordMap = await getPostRecordMap(post.notionPageId);

  return (
    <article>
      <PostHead
        post={post}
        // 2. 将动态的浏览量组件用 Suspense 包裹后传进去
        // 这样 PostHead 会立即渲染，views 位置会先显示 fallback 内容
        views={
          <Suspense
            fallback={<span className="text-sm text-gray-400">Loading...</span>}
          >
            <PostViewsWrapper slug={slug} />
          </Suspense>
        }
      />
      <Suspense fallback={<div>Loading...</div>}>
        <NotionRenderer recordMap={recordMap} />
      </Suspense>
    </article>
  );
};

export default BlogPostPage;
