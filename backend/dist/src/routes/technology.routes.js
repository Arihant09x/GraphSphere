import { Router } from "express";
import { technologyController } from "../controllers/technology.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { idParamSchema, paginationSchema } from "../schemas/common.schema.js";
export const technologyRoutes = Router();
technologyRoutes.use(authMiddleware);
technologyRoutes.get("/", validate(paginationSchema), technologyController.list);
technologyRoutes.get("/:id/developers", validate(idParamSchema), technologyController.developers);
technologyRoutes.get("/:id", validate(idParamSchema), technologyController.get);
//# sourceMappingURL=technology.routes.js.map