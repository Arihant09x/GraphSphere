export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(code: string, message: string, statusCode: number = 500) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = true;

    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string): AppError {
    return new AppError("BAD_REQUEST", message, 400);
  }

  static unauthorized(message: string = "Invalid email or password"): AppError {
    return new AppError("UNAUTHORIZED", message, 401);
  }

  static forbidden(message: string = "Forbidden"): AppError {
    return new AppError("FORBIDDEN", message, 403);
  }

  static notFound(message: string = "Resource not found"): AppError {
    return new AppError("NOT_FOUND", message, 404);
  }

  static conflict(message: string): AppError {
    return new AppError("CONFLICT", message, 409);
  }

  static unprocessable(message: string): AppError {
    return new AppError("UNPROCESSABLE_ENTITY", message, 422);
  }

  static tooManyRequests(message: string = "Too many requests"): AppError {
    return new AppError("TOO_MANY_REQUESTS", message, 429);
  }

  static serviceUnavailable(message: string = "Service unavailable"): AppError {
    return new AppError("SERVICE_UNAVAILABLE", message, 503);
  }

  static internal(message: string = "Internal server error"): AppError {
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
} as const;
