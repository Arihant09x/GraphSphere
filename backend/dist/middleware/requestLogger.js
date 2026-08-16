import pinoHttp from "pino-http";
import { env } from "../config/env.js";
export const requestLogger = pinoHttp({
    level: env.NODE_ENV === "production" ? "info" : "debug",
    redact: {
        paths: [
            "req.headers.authorization",
            "req.body.password",
            "req.body.passwordHash",
            "res.headers.authorization",
        ],
        censor: "[REDACTED]",
    },
    customLogLevel: (_req, res) => {
        if (res.statusCode >= 500)
            return "error";
        if (res.statusCode >= 400)
            return "warn";
        return "info";
    },
    customSuccessMessage: (_req, res) => {
        return `Request completed with status ${res.statusCode}`;
    },
    customErrorMessage: (_req, res) => {
        return `Request failed with status ${res.statusCode}`;
    },
});
//# sourceMappingURL=requestLogger.js.map