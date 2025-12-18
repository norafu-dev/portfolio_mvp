const PostCardSkeleton = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 p-4 -mx-4">
      {/* 左侧封面图骨架 */}
      <div className="w-full sm:w-48 aspect-[16/9] shrink-0 rounded-xl bg-neutral-200 animate-pulse" />

      {/* 右侧内容骨架 */}
      <div className="flex-1 flex flex-col gap-3">
        {/* 顶部信息栏 */}
        <div className="flex justify-between items-center">
          <div className="w-20 h-5 bg-neutral-200 rounded animate-pulse" />
          <div className="w-24 h-4 bg-neutral-200 rounded animate-pulse" />
        </div>
        {/* 标题 */}
        <div className="w-3/4 h-6 bg-neutral-200 rounded animate-pulse" />
      </div>
    </div>
  );
};

const PostListSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default PostListSkeleton;
