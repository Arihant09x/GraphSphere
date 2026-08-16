import { AppError } from "../utils/AppError.js";
import { logger } from "../config/logger.js";
export function errorHandler(err, req, res, _next) {
    const requestId = res.locals.requestId ?? req.id ?? "unknown";
    const requestLogger = req.log ?? logger;
    if (err instanceof AppError) {
        requestLogger.warn({
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
    requestLogger.error({ err, requestId }, "Unhandled request error");
    res.status(500).json({
        error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "An unexpected error occurred",
            requestId,
        },
    });
}
//# sourceMappingURL=errorHandler.js.map