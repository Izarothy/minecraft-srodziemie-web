import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getAllPosts } from "~/utils/markdownUtils";

export const pageRouter = createTRPCRouter({
  getAllPages: publicProcedure.query(() => {
    const allPages = getAllPosts().filter(
      (page) => page.category === "General"
    );

    return allPages;
  }),
});
