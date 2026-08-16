import type { Request, Response } from "express";
import { authService, type RegisterResult } from "../services/auth.service.js";
import { AppError } from "../utils/AppError.js";
import type { AuthenticatedRequest } from "../middleware/auth.js";

export const authController = {
  async register(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };

    const result = await authService.register(name, email, password);

    res.status(201).json({
      data: result,
    });
  },

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    const result = await authService.login(email, password);

    res.json({
      data: result,
    });
  },

  async me(req: Request, res: Response): Promise<void> {
    const authReq = req as AuthenticatedRequest;
    const userId = authReq.user.id;

    const result = await authService.getMe(userId);

    res.json({
      data: result,
    });
  },
};
