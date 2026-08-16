import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";
import { AppError } from "../utils/AppError.js";

export function validate(schema: ZodSchema) {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof Error && "issues" in error) {
        const zodError = error as {
          issues: Array<{ path: (string | number)[]; message: string }>;
        };
        const messages = zodError.issues
          .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
          .join("; ");
        next(AppError.badRequest(messages));
      } else {
        next(AppError.badRequest("Invalid request data"));
      }
    }
  };
}
