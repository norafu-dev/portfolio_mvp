import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  cacheLife: {
    blog: {
      stale: 3600, // 1 hour
      revalidate: 3600, // 1 hour
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.notionusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.notion.so",
      },
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
