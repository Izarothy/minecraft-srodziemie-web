import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { listRegionFiles, deleteRegionFile } from "~/server/services/ftp";
import { TRPCError } from "@trpc/server";
import { env } from "~/env.mjs";

export const regionRouter = createTRPCRouter({
  list: publicProcedure.query(async () => {
    try {
      const regions = await listRegionFiles();
      return { regions };
    } catch (error) {
      console.error("FTP list error:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch regions from FTP server",
        cause: error,
      });
    }
  }),

  delete: publicProcedure
    .input(
      z.object({
        x: z.number().int(),
        z: z.number().int(),
        authToken: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.authToken !== env.REGION_AUTH_TOKEN) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid authentication token",
        });
      }

      try {
        await deleteRegionFile(input.x, input.z);
        return {
          success: true,
          message: `Region r.${input.x}.${input.z}.mca deleted successfully`,
        };
      } catch (error) {
        console.error("FTP delete error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to delete region: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }
    }),
});
