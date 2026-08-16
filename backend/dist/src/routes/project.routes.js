import { Router } from "express";
import { projectController } from "../controllers/project.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { idParamSchema, paginationSchema } from "../schemas/common.schema.js";
export const projectRoutes = Router();
projectRoutes.use(authMiddleware);
projectRoutes.get("/", validate(paginationSchema), projectController.list);
projectRoutes.get("/:id/contributors", validate(idParamSchema), projectController.contributors);
projectRoutes.get("/:id", validate(idParamSchema), projectController.get);
//# sourceMappingURL=project.routes.js.map