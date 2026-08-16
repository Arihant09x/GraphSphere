import pinoHttpModule from "pino-http";
import { logger } from "../config/logger.js";
const createPinoHttp = pinoHttpModule;
export const requestLogger = createPinoHttp({
    logger,
    genReqId: (req) => String(req.headers["x-request-id"] ?? crypto.randomUUID()),
    customProps: (req) => ({ requestId: req.id }),
    customLogLevel: (_req, res, error) => {
        if (error || res.statusCode >= 500)
            return "error";
        if (res.statusCode >= 400)
            return "warn";
        return "info";
    },
    customSuccessMessage: (req, res) => `${req.method} ${req.url} completed with ${res.statusCode}`,
    customErrorMessage: (req, res, error) => `${req.method} ${req.url} failed with ${error?.message ?? res.statusCode}`,
    serializers: {
        req: (req) => ({
            method: req.method,
            url: req.url,
            // pino-http may pass an already-serialized request, which has no socket.
            remoteAddress: req.socket?.remoteAddress ?? req.remoteAddress,
            requestId: req.id,
        }),
        res: (res) => ({ statusCode: res.statusCode }),
    },
    autoLogging: true,
});
//# sourceMappingURL=requestLogger.js.map