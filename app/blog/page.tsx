import getPageProperties from "@/lib/notion/getPageProperties";
import siteConfig from "@/site.config";
import postsRepository from "@/lib/repositories/posts";
import type { Post } from "@/types/blog";
import PostList from "@/components/blog/PostList";

const BlogPage = async () => {
  "use cache";
  // const pageProperty = await getPageProperty(siteConfig.notion.dataSourceId);
  const posts = await postsRepository.findAll();
  return (
    // <pre className="whitespace-pre-wrap">
    //   {JSON.stringify(pageProperty, null, 2)}
    // </pre>
    <PostList posts={posts} />
  );
};

export default BlogPage;
