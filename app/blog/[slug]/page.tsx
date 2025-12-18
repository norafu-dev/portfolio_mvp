import { getPageIdBySlug } from "@/lib/notion/data";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const pageId = await getPageIdBySlug(slug);
  if (!pageId) {
    return notFound();
  }
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div>BlogPostPage: {pageId} </div>
      </Suspense>
    </>
  );
};

export default BlogPostPage;
