import { z } from "zod";
export declare const idParamSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const paginationSchema: z.ZodObject<{
    query: z.ZodObject<{
        limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
        offset: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type IdParam = z.infer<typeof idParamSchema>["params"];
export type PaginationQuery = z.infer<typeof paginationSchema>["query"];
//# sourceMappingURL=common.schema.d.ts.map