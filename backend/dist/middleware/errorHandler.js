import { AppError } from "../utils/AppError.js";
import pino from "pino";
const logger = pino({ name: "error-handler" });
export function errorHandler(err, _req, res, _next) {
    const requestId = res.locals?.requestId || "unknown";
    if (err instanceof AppError) {
        logger.warn({
            err: err.message,
            code: err.code,
            requestId,
            statusCode: err.statusCode,
        }, "Application error");
        res.status(err.statusCode).json({
            error: {
                code: err.code,
                message: err.message,
                requestId,
            },
        });
        return;
    }
    logger.error({ err, requestId }, "Unexpected error");
    res.status(500).json({
        error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "An unexpected error occurred",
            requestId,
        },
    });
}
//# sourceMappingURL=errorHandler.js.map