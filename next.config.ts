import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    blog: {
      stale: 60 * 60, // 不起作用，因为 generateStaticParams 会重新生成静态参数
      revalidate: 60 * 60 * 12, // 12 hours
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
