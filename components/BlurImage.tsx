import getImage from "@/lib/getImage";
import Image from "next/image";
import placeholderImage from "@/public/images/placeholder.webp";
import { cn } from "@/lib/utils";

const BlurImage = async ({
  src,
  alt,
  containerClassName,
  imageClassName,
  blurDataURL,
}: {
  src?: string;
  alt: string;
  containerClassName?: string;
  imageClassName?: string;
  blurDataURL?: string | null;
}) => {
  if (!src) {
    return <PlaceholderImage className={imageClassName} />;
  }

  let finalBase64 = blurDataURL;
  let finalAspectRatio = 16 / 9; // Default fallback

  // 如果没有传入 blurDataURL，则尝试在服务端获取
  if (!finalBase64) {
    const image = await getImage(src);
    if (image) {
      finalBase64 = image.base64;
      finalAspectRatio = image.aspectRatio;
    }
  }

  // 如果最终还是没有 base64，显示占位图
  if (!finalBase64) {
    return <PlaceholderImage className={imageClassName} />;
  }

  return (
    <figure
      className={cn(
        // 只有当计算出了特定比例时才应用，否则依赖外部或默认
        !blurDataURL && `aspect-[${finalAspectRatio}]`,
        "w-full h-full relative", // 确保 relative 给 fill 用
        containerClassName
      )}
    >
      <Image
        src={src}
        alt={alt}
        placeholder="blur"
        blurDataURL={finalBase64}
        fill
        className={cn("object-cover", imageClassName)}
      />
    </figure>
  );
};

const PlaceholderImage = ({ className }: { className?: string }) => {
  return (
    <Image
      src={placeholderImage}
      alt="Placeholder"
      fill
      placeholder="blur"
      className={cn("object-cover", className)}
    />
  );
};

export default BlurImage;
