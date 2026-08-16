export declare class AppError extends Error {
    readonly code: string;
    readonly statusCode: number;
    readonly isOperational: boolean;
    constructor(code: string, message: string, statusCode?: number);
    static badRequest(message: string): AppError;
    static unauthorized(message?: string): AppError;
    static forbidden(message?: string): AppError;
    static notFound(message?: string): AppError;
    static conflict(message: string): AppError;
    static unprocessable(message: string): AppError;
    static tooManyRequests(message?: string): AppError;
    static serviceUnavailable(message?: string): AppError;
    static internal(message?: string): AppError;
}
export declare const ErrorCodes: {
    readonly BAD_REQUEST: "BAD_REQUEST";
    readonly UNAUTHORIZED: "UNAUTHORIZED";
    readonly FORBIDDEN: "FORBIDDEN";
    readonly NOT_FOUND: "NOT_FOUND";
    readonly CONFLICT: "CONFLICT";
    readonly UNPROCESSABLE_ENTITY: "UNPROCESSABLE_ENTITY";
    readonly TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS";
    readonly SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE";
    readonly INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR";
};
//# sourceMappingURL=AppError.d.ts.map