import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { authRateLimiter } from "../middleware/rate-limit.js";
import { validate } from "../middleware/validate.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { authMiddleware } from "../middleware/auth.js";

export const authRoutes = Router();

authRoutes.post(
  "/register",
  authRateLimiter,
  validate(registerSchema),
  authController.register,
);
authRoutes.post(
  "/login",
  authRateLimiter,
  validate(loginSchema),
  authController.login,
);
authRoutes.get("/me", authMiddleware, authController.me);
