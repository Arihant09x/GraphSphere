import { z } from "zod";
export const idParamSchema = z.object({
    params: z.object({
        id: z.string().regex(/^(?:[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|[dptrcso]-0000-4000-8000-[0-9]{12})$/i, "Invalid ID format"),
    }),
});
export const paginationSchema = z.object({
    query: z.object({
        limit: z.coerce.number().int().positive().max(100).default(20),
        offset: z.coerce.number().int().nonnegative().default(0),
    }),
});
//# sourceMappingURL=common.schema.js.map