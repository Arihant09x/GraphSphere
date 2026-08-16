import { z } from "zod";
export declare const searchQuerySchema: z.ZodObject<{
    query: z.ZodObject<{
        q: z.ZodString;
        limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type SearchQuery = z.infer<typeof searchQuerySchema>["query"];
//# sourceMappingURL=search.schema.d.ts.map