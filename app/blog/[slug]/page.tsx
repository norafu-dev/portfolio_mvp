import { getPostBySlug, getPosts } from "@/lib/notion/data";
import PostHead from "@/components/blog/post/PostHead";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <BlogPostContent slug={slug} />
      </Suspense>
    </>
  );
};

const BlogPostContent = async ({ slug }: { slug: string }) => {
  const post = await getPostBySlug(slug);
  if (!post) {
    return notFound();
  }
  return (
    <article>
      <PostHead post={post} />
    </article>
  );
};

export default BlogPostPage;
