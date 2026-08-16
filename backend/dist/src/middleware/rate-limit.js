import rateLimit from "express-rate-limit";
import { env } from "../config/env.js";
import { logger } from "../config/logger.js";
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
    handler: (req, res, _next, options) => {
        (req.log ?? logger).warn({ requestId: res.locals.requestId, ip: req.ip, path: req.originalUrl }, "General rate limit exceeded");
        res.status(options.statusCode).json({ error: { ...options.message.error, requestId: res.locals.requestId ?? req.headers["x-request-id"] ?? "unknown" } });
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
    handler: (req, res, _next, options) => {
        (req.log ?? logger).warn({ requestId: res.locals.requestId, ip: req.ip, path: req.originalUrl }, "Authentication rate limit exceeded");
        res.status(options.statusCode).json({ error: { ...options.message.error, requestId: res.locals.requestId ?? req.headers["x-request-id"] ?? "unknown" } });
    },
});
export function requestIdMiddleware(req, res, next) {
    const requestId = req.headers["x-request-id"] || crypto.randomUUID();
    req.headers["x-request-id"] = requestId;
    res.locals.requestId = requestId;
    res.setHeader("X-Request-ID", requestId);
    next();
}
//# sourceMappingURL=rate-limit.js.map