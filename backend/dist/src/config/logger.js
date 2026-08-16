import pino from "pino";
import { env } from "./env.js";
export const logger = pino({
    name: "graphsphere-api",
    level: env.NODE_ENV === "production" ? "info" : "debug",
    redact: {
        paths: [
            "req.headers.authorization",
            "req.body.password",
            "req.body.passwordHash",
            "password",
            "passwordHash",
            "token",
            "accessToken",
        ],
        censor: "[REDACTED]",
    },
    base: { service: "graphsphere-api", environment: env.NODE_ENV },
    timestamp: pino.stdTimeFunctions.isoTime,
});
//# sourceMappingURL=logger.js.map