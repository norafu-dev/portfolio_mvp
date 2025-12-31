import { getPageIdBySlug } from "@/lib/notion/data";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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
  const pageId = await getPageIdBySlug(slug);
  if (!pageId) {
    return notFound();
  }
  return <div>BlogPostPage: {pageId} </div>;
};

export default BlogPostPage;
