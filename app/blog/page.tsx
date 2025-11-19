// app/blog/page.tsx
import getPageProperties from "@/lib/notion/getPageProperties";
import siteConfig from "@/site.config";
import PostList from "@/components/blog/PostList";

const BlogPage = async () => {
  "use cache";
  const posts = await getPageProperties(siteConfig.notion.dataSourceId);

  return <PostList posts={posts} />;
};

export default BlogPage;
