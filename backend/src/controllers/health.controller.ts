import type { Request, Response } from "express";
import { checkDatabaseHealth } from "../db/health.js";
import { AppError } from "../utils/AppError.js";

export const healthController = {
  async check(_req: Request, res: Response): Promise<void> {
    const dbHealth = await checkDatabaseHealth();

    if (dbHealth.status === "unhealthy") {
      throw AppError.serviceUnavailable(
        `Database unavailable: ${dbHealth.details}`,
      );
    }

    res.json({
      status: "healthy",
      database: "healthy",
    });
  },
};
