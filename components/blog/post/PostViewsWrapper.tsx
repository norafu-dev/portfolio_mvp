import { connection } from "next/server";
import getPostViews from "@/lib/getPostViews";
import PostViews from "./PostViews";

export default async function PostViewsWrapper({ slug }: { slug: string }) {
  // 明确声明这是动态组件，必须在 Suspense 边界内运行
  await connection();

  console.log(`[PostViewsWrapper] Fetching views for: ${slug}`);
  const views = await getPostViews(`/blog/${slug}`);
  return <PostViews views={views} />;
}
