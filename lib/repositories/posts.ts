import prisma from "@/lib/db";

const postsRepository = {
  findAll: async () => {
    const posts = await prisma.post.findMany({
      orderBy: {
        publishedAt: "desc",
      },
    });
    return posts;
  },
};

export default postsRepository;
