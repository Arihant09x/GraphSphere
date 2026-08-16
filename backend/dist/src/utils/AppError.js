export class AppError extends Error {
    code;
    statusCode;
    isOperational;
    constructor(code, message, statusCode = 500) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.isOperational = true;
        Object.setPrototypeOf(this, AppError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
    static badRequest(message) {
        return new AppError("BAD_REQUEST", message, 400);
    }
    static unauthorized(message = "Invalid email or password") {
        return new AppError("UNAUTHORIZED", message, 401);
    }
    static forbidden(message = "Forbidden") {
        return new AppError("FORBIDDEN", message, 403);
    }
    static notFound(message = "Resource not found") {
        return new AppError("NOT_FOUND", message, 404);
    }
    static conflict(message) {
        return new AppError("CONFLICT", message, 409);
    }
    static unprocessable(message) {
        return new AppError("UNPROCESSABLE_ENTITY", message, 422);
    }
    static tooManyRequests(message = "Too many requests") {
        return new AppError("TOO_MANY_REQUESTS", message, 429);
    }
    static serviceUnavailable(message = "Service unavailable") {
        return new AppError("SERVICE_UNAVAILABLE", message, 503);
    }
    static internal(message = "Internal server error") {
        return new AppError("INTERNAL_SERVER_ERROR", message, 500);
    }
}
export const ErrorCodes = {
    BAD_REQUEST: "BAD_REQUEST",
    UNAUTHORIZED: "UNAUTHORIZED",
    FORBIDDEN: "FORBIDDEN",
    NOT_FOUND: "NOT_FOUND",
    CONFLICT: "CONFLICT",
    UNPROCESSABLE_ENTITY: "UNPROCESSABLE_ENTITY",
    TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",
    SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
};
//# sourceMappingURL=AppError.js.map