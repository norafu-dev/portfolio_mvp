import getImage from "@/lib/getImage";
import Image from "next/image";
import placeholderImage from "@/public/images/placeholder.webp";

const BlurImage = async ({ src, alt }: { src?: string; alt: string }) => {
  if (!src) {
    return <PlaceholderImage />;
  }
  const image = await getImage(src);
  if (!image) {
    return <PlaceholderImage />;
  }
  const { base64, aspectRatio } = image;

  return (
    <figure className={`aspect-[${aspectRatio}]`}>
      <Image
        src={src}
        alt={alt}
        placeholder="blur"
        blurDataURL={base64}
        fill
        className="object-cover"
      />
    </figure>
  );
};

const PlaceholderImage = () => {
  return (
    <Image
      src={placeholderImage}
      alt="Placeholder"
      fill
      placeholder="blur"
      className="object-cover"
    />
  );
};

export default BlurImage;
