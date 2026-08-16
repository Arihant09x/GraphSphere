import { z } from "zod";
const envSchema = z.object({
    NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),
    PORT: z.coerce.number().int().positive().default(5000),
    COGNODB_URI: z.string().url(),
    COGNODB_USERNAME: z.string().min(1),
    COGNODB_PASSWORD: z.string().min(1),
    COGNODB_DATABASE: z.string().min(1).default("neo4j"),
    JWT_SECRET: z.string().min(32),
    JWT_EXPIRES_IN: z.string().default("1d"),
    DEMO_USER_EMAIL: z.string().email().default("demo@graphsphere.dev"),
    DEMO_USER_PASSWORD: z.string().min(8),
    CORS_ORIGIN: z.string().url().default("http://localhost:3000"),
    RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(900000),
    RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),
    AUTH_RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(600000),
    AUTH_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(5),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error("❌ Invalid environment variables:");
    console.error(JSON.stringify(parsed.error.flatten().fieldErrors, null, 2));
    process.exit(1);
}
export const env = parsed.data;
//# sourceMappingURL=env.js.map