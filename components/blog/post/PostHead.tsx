import BlurImage from "@/components/BlurImage";
import { NotionPageMeta } from "@/types/notion";
import { cn } from "@/lib/utils";

// 简单的 SVG 图标，避免引入额外库
const ClockIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const PostHead = ({
  post,
  views,
}: {
  post: NotionPageMeta;
  views: React.ReactNode;
}) => {
  const {
    title,
    publishedAt,
    editedAt,
    tags,
    category,
    coverUrl,
    blurDataURL,
  } = post;

  return (
    <header className="flex flex-col gap-12 mt-16">
      {/* 标题 - 放在最上方 */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-gray-900 dark:text-gray-100 ">
        {title}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-20 gap-8 lg:gap-8">
        {/* 封面：大屏占 2/3 */}
        <div className="lg:col-span-14 w-full aspect-video relative rounded-2xl overflow-hidden shadow-sm bg-gray-100 dark:bg-neutral-800">
          <BlurImage
            src={coverUrl ?? undefined}
            alt={title}
            blurDataURL={blurDataURL}
            containerClassName="w-full h-full"
            imageClassName="w-full h-full object-cover"
          />
        </div>

        {/* 元信息：卡片样式 */}
        <div className="lg:col-span-6 h-fit border border-gray-200 dark:border-neutral-800 rounded-2xl p-6 bg-white dark:bg-neutral-900/50">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-6">
            Post Details
          </h3>

          <div className="flex flex-col">
            {/* Category - 对应 UI 的 Type */}
            <MetaRow label="Category">
              {category ? (
                <span className="">{category}</span>
              ) : (
                <span className="text-gray-400 italic text-sm">None</span>
              )}
            </MetaRow>

            {/* Tags - 对应 UI 的 Topic(s) */}
            <MetaRow label="Tags">
              {tags.length > 0 ? (
                <div className="flex flex-wrap gap-1 justify-end max-w-[60%]">
                  {tags.map((tag, idx) => (
                    <span
                      key={tag}
                      className="text-sm font-semibold text-gray-900 dark:text-gray-100"
                    >
                      {tag}
                      {idx < tags.length - 1 && ","}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-gray-400 italic text-sm">No tags</span>
              )}
            </MetaRow>

            {/* Published - 对应 UI 的 Published */}
            <MetaRow label="Published">
              <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <ClockIcon className="w-4 h-4 text-gray-500" />
                <time dateTime={publishedAt ?? ""} className="text-sm">
                  {publishedAt ?? "Draft"}
                </time>
              </div>
            </MetaRow>

            {/* Views */}
            <MetaRow label="Views" isLast>
              <div className="text-gray-900 dark:text-gray-100 font-medium">
                {views ?? "-"}
              </div>
            </MetaRow>
          </div>
        </div>
      </div>
    </header>
  );
};

// 新的行组件，支持 Flex 左右对齐 + 底部分割线
const MetaRow = ({
  label,
  children,
  isLast = false,
}: {
  label: string;
  children: React.ReactNode;
  isLast?: boolean;
}) => (
  <div
    className={cn(
      "flex items-center justify-between py-4",
      !isLast && "border-b border-gray-100 dark:border-neutral-800"
    )}
  >
    <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">
      {label}
    </span>
    <div className="flex items-center justify-end">{children}</div>
  </div>
);

export default PostHead;
