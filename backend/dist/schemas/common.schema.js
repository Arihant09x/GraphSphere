import { z } from "zod";
export const idParamSchema = z.object({
    params: z.object({
        id: z.string().uuid("Invalid ID format"),
    }),
});
export const paginationSchema = z.object({
    query: z.object({
        limit: z.coerce.number().int().positive().max(100).default(20),
        offset: z.coerce.number().int().nonnegative().default(0),
    }),
});
//# sourceMappingURL=common.schema.js.map