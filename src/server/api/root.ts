import { pageRouter } from "~/server/api/routers/pages";
import { regionRouter } from "~/server/api/routers/regions";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  page: pageRouter,
  region: regionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
