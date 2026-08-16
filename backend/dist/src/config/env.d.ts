import { z } from "zod";
declare const envSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<{
        development: "development";
        production: "production";
        test: "test";
    }>>;
    PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    COGNODB_URI: z.ZodString;
    COGNODB_USERNAME: z.ZodString;
    COGNODB_PASSWORD: z.ZodString;
    COGNODB_DATABASE: z.ZodDefault<z.ZodString>;
    JWT_SECRET: z.ZodString;
    JWT_EXPIRES_IN: z.ZodDefault<z.ZodString>;
    DEMO_USER_EMAIL: z.ZodDefault<z.ZodString>;
    DEMO_USER_PASSWORD: z.ZodDefault<z.ZodString>;
    CORS_ORIGIN: z.ZodDefault<z.ZodString>;
    RATE_LIMIT_WINDOW_MS: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    RATE_LIMIT_MAX: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    AUTH_RATE_LIMIT_WINDOW_MS: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    AUTH_RATE_LIMIT_MAX: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export declare const env: {
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    COGNODB_URI: string;
    COGNODB_USERNAME: string;
    COGNODB_PASSWORD: string;
    COGNODB_DATABASE: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    DEMO_USER_EMAIL: string;
    DEMO_USER_PASSWORD: string;
    CORS_ORIGIN: string;
    RATE_LIMIT_WINDOW_MS: number;
    RATE_LIMIT_MAX: number;
    AUTH_RATE_LIMIT_WINDOW_MS: number;
    AUTH_RATE_LIMIT_MAX: number;
};
export type Env = z.infer<typeof envSchema>;
export {};
//# sourceMappingURL=env.d.ts.map