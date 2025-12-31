import { getPlaiceholder } from "plaiceholder";

const getImage = async (
  url: string
): Promise<{ base64: string; aspectRatio: number } | null> => {
  try {
    const response = await fetch(url, {
      next: { revalidate: 60 * 60 * 12 },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const buffer = await response.arrayBuffer();

    const {
      base64,
      metadata: { width, height },
    } = await getPlaiceholder(Buffer.from(buffer));

    const aspectRatio = width / height;

    return { base64, aspectRatio };
  } catch (error) {
    return null;
  }
};

export default getImage;
