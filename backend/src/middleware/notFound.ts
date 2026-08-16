import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";

export function notFoundHandler(
  _req: Request,
  _res: Response,
  next: NextFunction,
): void {
  next(AppError.notFound("Route not found"));
}
