import { z } from "zod";
export const searchQuerySchema = z.object({
    query: z.object({
        q: z.string().min(1, "Search query is required").max(200),
        limit: z.coerce.number().int().positive().max(50).default(10),
    }),
});
//# sourceMappingURL=search.schema.js.map