import { AppError } from "../utils/AppError.js";
export function notFoundHandler(_req, _res, next) {
    next(AppError.notFound("Route not found"));
}
//# sourceMappingURL=notFound.js.map