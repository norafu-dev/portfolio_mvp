import Link from "next/link";
import type { NotionPageMeta } from "@/types/notion";
import BlurImage from "../BlurImage";

const PostCard = ({ post }: { post: NotionPageMeta }) => {
  const { slug, title, coverUrl, tags, publishedAt, blurDataURL } = post;

  // 简单的日期格式化函数：YYYY-MM-DD
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-CA"); // en-CA 输出格式为 YYYY-MM-DD
  };

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="flex flex-col sm:flex-row gap-6 p-4 -mx-4 rounded-2xl transition-colors duration-300 hover:bg-white/5">
        {/* 左侧封面图区域 */}
        <div className="relative w-full sm:w-48 aspect-[16/9] shrink-0 overflow-hidden rounded-xl bg-neutral-800/50 border border-white/10">
          <BlurImage
            src={coverUrl ?? undefined}
            alt={title}
            blurDataURL={blurDataURL}
            imageClassName="group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>

        {/* 右侧内容区域 */}
        <div className="flex-1 w-full min-w-0 flex flex-col gap-3">
          {/* 顶部信息栏：标签和时间 */}
          <div className="flex items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="pr-2 py-1 rounded bg-white/10 text-neutral-600 border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>

            {publishedAt && (
              <time
                dateTime={publishedAt}
                className="shrink-0 text-neutral-700 flex items-center gap-1.5"
              >
                {/* 移除了前面的小圆点，感觉纯文字更简洁 */}
                {formatDate(publishedAt)}
              </time>
            )}
          </div>

          {/* 标题 */}
          <h2 className="text-neutral-700 group-hover:text-blue-400 transition-colors tracking-wide">
            {title}
          </h2>
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
