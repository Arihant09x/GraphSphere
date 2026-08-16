import rateLimit from "express-rate-limit";
import { env } from "../config/env.js";
export const generalRateLimiter = rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX,
    message: {
        error: {
            code: "TOO_MANY_REQUESTS",
            message: "Too many requests, please try again later",
            requestId: "unknown",
        },
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, res, _next, options) => {
        res.status(options.statusCode).json(options.message);
    },
});
export const authRateLimiter = rateLimit({
    windowMs: env.AUTH_RATE_LIMIT_WINDOW_MS,
    max: env.AUTH_RATE_LIMIT_MAX,
    message: {
        error: {
            code: "TOO_MANY_REQUESTS",
            message: "Too many authentication attempts, please try again later",
            requestId: "unknown",
        },
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, res, _next, options) => {
        res.status(options.statusCode).json(options.message);
    },
});
export function requestIdMiddleware(req, _res, next) {
    const requestId = req.headers["x-request-id"] || crypto.randomUUID();
    req.headers["x-request-id"] = requestId;
    next();
}
//# sourceMappingURL=rate-limit.js.map